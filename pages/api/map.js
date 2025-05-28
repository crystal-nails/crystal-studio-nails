import dbConnect from '../../utils/dbConnect';
import Map from '../../models/map';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const data = await Map.findOne();
    res.status(200).json({ address: data?.address || '' });
  } else if (req.method === 'POST') {
    const { address } = req.body;
    let data = await Map.findOne();
    if (data) {
      data.address = address;
      await data.save();
    } else {
      await Map.create({ address });
    }
    res.status(200).json({ message: 'Адрес сохранён' });
  } else {
    res.status(405).json({ message: 'Метод не поддерживается' });
  }
}