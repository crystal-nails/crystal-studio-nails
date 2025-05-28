import dbConnect from '../../utils/dbConnect';
import AboutSection from '../../models/aboutSection';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'PATCH') {
    const { order } = req.body;
    for (let i = 0; i < order.length; i++) {
      await AboutSection.findByIdAndUpdate(order[i], { order: i + 1 });
    }
    res.status(200).json({ message: 'Порядок обновлен' });
  } else {
    res.status(405).json({ message: 'Метод не поддерживается' });
  }
}