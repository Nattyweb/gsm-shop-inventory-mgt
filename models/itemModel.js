const mongoose = require("mongoose")
const {Schema} = mongoose

const itemSchema = new Schema({
    name: String,
    category: String,
    brand: String,
    description: String,
    price: String,
    userId: String
  });


const Items = mongoose.model("Items", itemSchema);


module.exports = Items;