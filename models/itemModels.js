const mongoose = require("mongoose")
const {Schema} = mongoose

const itemSchema = new Schema({
    name: String,
    category: String,
    brand: String,
    description: String,
    price: String
    User-id: [{
      type: Schema.Types.ObjectId,
      ref: 'User' }]
  });


const Items = mongoose.model("Items", itemSchema);


module.exports = Items;