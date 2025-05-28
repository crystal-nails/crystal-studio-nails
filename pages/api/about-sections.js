import dbConnect from '../../utils/dbConnect';
import AboutSection from '../../models/aboutSection';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const sections = await AboutSection.find({}).sort({ order: 1 });
    return res.status(200).json({ sections });
  }

  if (req.method === 'POST') {
    const { title, content, imageUrl, cta, order } = req.body;
    const section = await AboutSection.create({ title, content, imageUrl, cta, order });
    return res.status(201).json({ _id: section._id });
  }

  if (req.method === 'PATCH') {
    const { id, title, content, imageUrl, cta, order } = req.body;
    const section = await AboutSection.findByIdAndUpdate(
      id,
      { title, content, imageUrl, cta, order },
      { new: true }
    );
    return res.status(200).json({ section });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    await AboutSection.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Секция удалена' });
  }

  return res.status(405).json({ message: 'Метод не поддерживается' });
}