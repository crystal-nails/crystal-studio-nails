import dbConnect from '../../utils/dbConnect';
import Hero from '../../models/Hero';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const hero = await Hero.findOne();
      res.status(200).json({ hero });
    } catch (err) {
      res.status(500).json({ error: 'Ошибка при получении Hero' });
    }
  } else if (req.method === 'POST') {
    try {
      const { headline, subtext } = req.body;

      if (!headline || !subtext) {
        return res.status(400).json({ error: 'Заголовок и подтекст обязательны' });
      }

      let hero = await Hero.findOne();

      if (!hero) {
        hero = new Hero({ headline, subtext });
      } else {
        hero.headline = headline;
        hero.subtext = subtext;
      }

      await hero.save();
      res.status(200).json({ message: 'Hero обновлён' });
    } catch (err) {
      res.status(500).json({ error: 'Ошибка при сохранении Hero' });
    }
  } else {
    res.status(405).json({ error: 'Метод не поддерживается' });
  }
}
