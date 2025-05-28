
import Footer from '../../models/footer'
import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = await Footer.create({});
    }
    res.status(200).json({ footer });
  }

 else if (req.method === 'PUT') {
  const body = req.body;
  console.log('body', body);

  let footer = await Footer.findOne();

  if (!footer) {

    await Footer.create(body);
  } else {

    await Footer.updateOne({}, {
      $set: {
        logoUrl: body.logoUrl,
        phone: body.phone,
        address: body.address,
        copyright: body.copyright,
        links: body.links,
        'social.instagram': body.social?.instagram || '',
        'social.tiktok': body.social?.tiktok || '',
        'social.whatsapp': body.social?.whatsapp || '',
      }
    });
  }

  res.status(200).json({ success: true });
}


  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
