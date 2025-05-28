import dbConnect from '../../utils/dbConnect';
import Header from '../../models/Header';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const header = await Header.findOne();
      res.status(200).json({ header });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка загрузки', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Метод не поддерживается' });
  }
}
