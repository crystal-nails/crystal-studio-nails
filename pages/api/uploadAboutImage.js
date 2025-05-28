import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
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
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: `Метод ${req.method} не поддерживается` });
    }

    const { id } = req.query;

    if (!id || id === 'undefined') {
      return res.status(400).json({ error: 'Отсутствует корректный ID секции' });
    }

    const form = formidable({ multiples: false });

    await new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Formidable error:', err);
          return reject({ status: 500, message: 'Ошибка обработки формы' });
        }

        const file = files?.file;
        let filepath;
        if (file && Array.isArray(file) && file.length > 0) {
          filepath = file[0].filepath || file[0].path;
        } else if (file && !Array.isArray(file)) {
          filepath = file.filepath || file.path;
        }

        if (!filepath) {
          console.error('Не найден путь к файлу:', file);
          return reject({ status: 400, message: 'Файл не найден' });
        }

        try {
          await dbConnect();

          const result = await cloudinary.uploader.upload(filepath, {
            folder: 'about',
            use_filename: true,
            unique_filename: false,
            overwrite: true,
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
            return resolve({ status: 404, data: { error: 'Секция не найдена' } });
          }

          return resolve({ status: 200, data: { imageUrl: updatedSection.imageUrl } }); 
        } catch (uploadErr) {
          console.error('Ошибка при загрузке:', uploadErr);
          return reject({ status: 500, message: 'Ошибка загрузки изображения' });
        }
      });
    })
    .then(({ status, data }) => res.status(status).json(data))
    .catch(({ status, message }) => res.status(status || 500).json({ error: message || 'Произошла ошибка' }));

  } catch (error) {
    console.error('Непредвиденная ошибка:', error);
    return res.status(500).json({ error: 'Непредвиденная ошибка сервера' });
  }
}