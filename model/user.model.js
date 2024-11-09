const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    number: {type: Number, required: true, unique: true},
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
},
{
    timestamps: true,
})

const User = mongoose.model("User", userSchema);

module.exports = User;