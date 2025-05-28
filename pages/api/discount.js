import dbConnect from '../../utils/dbConnect';
import Discount from '../../models/discount';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const data = await Discount.findOne();
    return res.status(200).json({ discount: data });
  }

  if (req.method === 'POST') {
    const { enabled, reason, amount, description } = req.body;
    let discount = await Discount.findOne();
    if (discount) {
      discount.enabled = enabled;
      discount.reason = reason;
      discount.amount = amount;
      discount.description = description;
      await discount.save();
    } else {
      await Discount.create({ enabled, reason, amount, description });
    }
    return res.status(200).json({ message: 'Скидка обновлена' });
  }

  return res.status(405).json({ message: 'Метод не поддерживается' });
}
