import dbConnect from '../../utils/dbConnect';
import OurPropos from '../../models/OurPropos';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const { order: newOrder } = req.body;

  try {
    const propos = await OurPropos.findOne();
    if (!propos) return res.status(404).json({ error: 'Данные не найдены' });

    // Перестраиваем items по новому порядку ID
    const ordered = newOrder.map(id => propos.items.find(item => item._id.toString() === id));
    if (ordered.includes(undefined)) return res.status(400).json({ error: 'Неверный список ID' });

    propos.items = ordered;
    await propos.save();

    res.status(200).json({ message: 'Порядок обновлён' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении порядка' });
  }
}