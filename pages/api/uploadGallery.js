import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import dbConnect from '../../utils/dbConnect';
import GalleryImage from '../../models/GalleryImage';

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

  const form = formidable({ multiples: false });

form.parse(req, async (err, fields, files) => {
  if (err) {
    console.error('Formidable error:', err);
    return res.status(500).json({ error: 'Ошибка обработки формы' });
  }

  const file = files.file;
  if (!file) {
    console.error('Файл не найден в запросе');
    return res.status(400).json({ error: 'Файл не найден' });
  }

  const filepath = file.filepath || file.path || (Array.isArray(file) ? file[0].filepath : undefined);

  if (!filepath) {
    console.error('Путь к файлу не найден в объекте file:', file);
    return res.status(400).json({ error: 'Путь к файлу не найден' });
  }

  try {
    await dbConnect();

    console.log('Загружаем файл в Cloudinary:', filepath);

    const result = await cloudinary.uploader.upload(filepath, {
      folder: 'gallery',
      use_filename: true,
      unique_filename: false,
      overwrite: false,
      transformation: [
        { fetch_format: 'auto' },
        { quality: 'auto:eco' },
      ],
    });

    console.log('Cloudinary upload result:', result);

    const image = await GalleryImage.create({
      url: result.secure_url,
      public_id: result.public_id,
    });

    res.status(200).json(image);
  } catch (uploadErr) {
    console.error('Ошибка загрузки в Cloudinary или БД:', uploadErr);
    res.status(500).json({ error: 'Ошибка загрузки в Cloudinary или сохранения в БД' });
  }
});
}
