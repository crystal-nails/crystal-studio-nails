import { default as nextConnect } from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = './public/uploads/hero'; // Папка для сохранения изображений
const heroImagePath = path.join(uploadDir, 'hero.jpg');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, 'hero.jpg');
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Ошибка загрузки: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Метод ${req.method} не поддерживается` });
  },
});


apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {

  res.status(200).json({ url: '/uploads/hero/hero.jpg' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};