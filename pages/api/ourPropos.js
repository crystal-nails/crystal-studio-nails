import dbConnect from '../../utils/dbConnect';
import OurPropos from '../../models/OurPropos';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { headline, subtext, backgroundImage = '', price } = req.body;
    const newItem = { headline, subtext, backgroundImage, price };
    console.log('New item:', newItem);

    let doc = await OurPropos.findOne();
    if (!doc) {
      doc = await OurPropos.create({ items: [newItem] });
    } else {
      doc.items.push(newItem);
      console.log('doc.items', doc.items);
      await doc.save();
    }

    res.status(200).json({ propos: doc });
  }

  else if (req.method === 'PUT') {
    const { id, headline, subtext, backgroundImage, price } = req.body;

    const doc = await OurPropos.findOne();
    if (!doc) return res.status(404).json({ error: 'Документ не найден' });

    const item = doc.items.id(id);
    if (!item) return res.status(404).json({ error: 'Секция не найдена' });

    if (headline !== undefined) item.headline = headline;
    if (subtext !== undefined) item.subtext = subtext;
    if (backgroundImage !== undefined) item.backgroundImage = backgroundImage;
    if (price !== undefined) item.price = price;

    await doc.save();
    res.status(200).json({ propos: doc });
  }

  else if (req.method === 'DELETE') {
    const { id } = req.query;
    const doc = await OurPropos.findOne();
    if (!doc) return res.status(404).json({ error: 'Документ не найден' });

    const item = doc.items.id(id);
    if (!item) return res.status(404).json({ error: 'Секция не найдена' });

    // Удаление файла
    if (item.backgroundImage) {
      const filePath = path.join(process.cwd(), 'public', item.backgroundImage);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    item.deleteOne();
    await doc.save();
    res.status(200).json({ propos: doc });
  }

  else if (req.method === 'GET') {
    const doc = await OurPropos.findOne();
    res.status(200).json({ propos: doc || { items: [] } });
  }

  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Метод ${req.method} не поддерживается`);
  }
}