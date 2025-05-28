export default function handler(req, res) {
    const { password } = req.body;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; 
  
    if (password === ADMIN_PASSWORD) {
      res.setHeader('Set-Cookie', `admin_auth=1; Path=/; HttpOnly; Max-Age=3600`);
      return res.status(200).json({ message: 'OK' });
    } else {
      return res.status(401).json({ message: 'Invalid password' });
    }
  }