const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String 
  });



const Users = mongoose.model("Users", userSchema);


module.exports = Users;