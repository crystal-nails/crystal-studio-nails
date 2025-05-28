import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = './public/uploads/logo';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `footer-logo${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect();
apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
  const imageUrl = `/uploads/logo/${req.file.filename}`;
  res.status(200).json({ url: imageUrl });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
