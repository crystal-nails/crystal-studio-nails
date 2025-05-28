import mongoose from 'mongoose';


const headerSchema = new mongoose.Schema({
  navigation1:{ type: String },
  navigation2: { type: String },
  navigation3: { type: String },
  navigation4: { type: String },
  navigation5: { type: String },
  navigation6: { type: String },
  bookingLink: { type: String, required: true },
});

const Header = mongoose.models.Header || mongoose.model('Header', headerSchema);

export default Header;
