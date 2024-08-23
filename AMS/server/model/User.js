const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registerNumber: { type: String, required: true },
  yearOfStudying: { type: String, required: true },
  branchOfStudying: { type: String, required: true },
  gender: { type: String, required: true },
  attendance: { type: String, default: 'Absent' }, 
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
