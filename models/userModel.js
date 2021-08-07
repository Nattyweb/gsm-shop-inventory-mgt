const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    birthYear: Number,
    password: String 
  });



const Users = mongoose.model("Users", userSchema);


module.exports = Users;