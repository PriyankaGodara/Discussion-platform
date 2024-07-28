const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   name: { type: String, required: true },
   mobileNo: { type: String, required: true, unique: true },
   email: { type: String, unique: true, required: true }
})

module.exports = mongoose.model('User', UserSchema);