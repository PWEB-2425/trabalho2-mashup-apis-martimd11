const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  searches: [String]
});
module.exports = mongoose.model('User', UserSchema);