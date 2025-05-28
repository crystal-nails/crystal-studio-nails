import mongoose from 'mongoose';


const headerSchema = new mongoose.Schema({
  navigation1:{ type: String, required: true },
  navigation2: { type: String, required: true },
  navigation3: { type: String, required: true },
  navigation4: { type: String, required: true },
  navigation5: { type: String, required: true },
  navigation6: { type: String, required: true },
  bookingLink: { type: String, required: true },
});

const Header = mongoose.models.Header || mongoose.model('Header', headerSchema);

export default Header;
