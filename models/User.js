const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  name: String,
  username: String,
  email: String,
});

mongoose.model('users', userSchema);
