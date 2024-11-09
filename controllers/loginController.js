const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const User = require("../model/user.model");

const loginHandler = async (req, res) => {
  try {
    const user = await User.findOne({ number: req.body.number });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid Mobile Number' });
    }
    if (!user.password) {
      console.log('Password not found');
      return res.status(401).json({ message: 'Invalid Password' });
    }
    const decodePassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY.toString(CryptoJS.enc.Utf8));
    if (decodePassword.toString(CryptoJS.enc.Utf8) !== req.body.password) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Incorrect Password' });
    }
    console.log('Login successful');
    const { password, ...rest } = user._doc;
    const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN);
    res.json({ ...rest, accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
};

module.exports = loginHandler;