import dbConnect from '../../utils/dbConnect';
import Header from '../../models/Header';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    try {
      const { navigation1, navigation2, navigation3, navigation4, bookingLink } = req.body;

      let header = await Header.findOne();

      if (!header) {

        header = new Header({
            navigation1,
            navigation2,
            navigation3,
            navigation4,
            bookingLink,
        });
      } else {

        header.navigation1 = navigation1;
        header.navigation2 = navigation2;
        header.navigation3 = navigation3;
        header.navigation4 = navigation4;
        header.bookingLink = bookingLink;
      }


      await header.save();
      res.status(201).json({ message: 'Данные хедера успешно добавлены или обновлены' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при добавлении данных хедера', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Метод не поддерживается' });
  }
}