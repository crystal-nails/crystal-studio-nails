import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';
import dbConnect from '../../utils/dbConnect';
import AboutSection from '../../models/aboutSection';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Метод ${req.method} не поддерживается` });
  }

  const { id } = req.query;

  if (!id || id === 'undefined') {
    return res.status(400).json({ error: 'Отсутствует корректный ID секции' });
  }

  const form = formidable({ multiples: false, keepExtensions: true });

  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Ошибка при парсинге формы:', err);
          reject(err);
        } else {
          resolve([fields, files]);
        }
      });
    });

    const file = files?.file;

    const filepath =
      file?.[0]?.filepath || file?.[0]?.path || file?.filepath || file?.path;

    if (!filepath) {
      console.error('Файл не найден по пути:', file);
      return reject({ status: 400, message: 'Файл не найден' });
    }

    await dbConnect();

    const result = await cloudinary.uploader.upload(filepath, {
      folder: 'about',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      timeout: 120000, // 2 минуты
      transformation: [
        { fetch_format: 'auto' },
        { quality: 'auto:eco' },
      ],
    });

    const image = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    const updatedSection = await AboutSection.findByIdAndUpdate(
      id,
      { $set: { imageUrl: image } },
      { new: true }
    );

    if (!updatedSection) {
      return res.status(404).json({ error: 'Секция не найдена' });
    }

    return res.status(200).json({ imageUrl: updatedSection.imageUrl });
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
    return res.status(500).json({ error: error?.message || 'Ошибка при загрузке изображения' });
  }
}
