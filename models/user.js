/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = new Schema({
  username: String,
  password: String,
  admin: {
    type: Boolean,
    default: false,
  },
});

// create new User document
User.statics.create = function (username, password) {
  const user = new this({
    username,
    password,
  });

  // return the Promise
  return user.save();
};

User.statics.findOneByUsername = function (username) {
  console.log(username);
  return this.findOne({
    username,
  }).exec();
};

// verify the password of the User document
User.methods.verify = function (password) {
  return this.password === password;
};

User.methods.assignAdmin = function () {
  this.admin = true;
  return this.save();
};

module.exports = mongoose.model('User', User);
