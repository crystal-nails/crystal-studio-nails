import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  // Тестирование: отправка ответа о подключении
  res.status(200).json({ message: 'База данных подключена успешно!' });
}