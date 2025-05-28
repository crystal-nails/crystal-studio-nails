import dbConnect from '../../utils/dbConnect';
import Header from '../../models/Header';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    try {
      const { navigation1, navigation2, navigation3, navigation4, bookingLink } = req.body;

      // Проверяем, существует ли уже запись
      let header = await Header.findOne();

      if (!header) {
        // Если записи нет, создаем новый документ
        header = new Header({
            navigation1,
            navigation2,
            navigation3,
            navigation4,
            bookingLink,
        });
      } else {
        // Обновляем существующую запись
        header.navigation1 = navigation1;
        header.navigation2 = navigation2;
        header.navigation3 = navigation3;
        header.navigation4 = navigation4;
        header.bookingLink = bookingLink;
      }

      // Сохраняем или обновляем документ в базе данных
      await header.save();
      res.status(201).json({ message: 'Данные хедера успешно добавлены или обновлены' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при добавлении данных хедера', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Метод не поддерживается' });
  }
}