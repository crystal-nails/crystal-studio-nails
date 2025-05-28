import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '../../utils/dbConnect';
import GalleryImage from '../../models/GalleryImage';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const images = await GalleryImage.find().sort({ _id: -1 });
    return res.status(200).json(images);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;

    const image = await GalleryImage.findById(id);
    if (!image) return res.status(404).json({ error: 'Изображение не найдено' });

    // Удаляем с Cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Удаляем из БД
    await GalleryImage.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Удалено' });
  }

  res.status(405).json({ error: `Метод ${req.method} не поддерживается` });
}
