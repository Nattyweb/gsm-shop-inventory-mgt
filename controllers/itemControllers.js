// ...
const express = require('express');
const mongoose = require('mongoose');
const itemModel = require('../models/itemModels');

//______________________________________
//--------------------------------------

//create item
module.exports.createItems = async (req, res, Next) => {
  const {name, category, brand, description, price} = req.body
  //validate that the required item details are entered correctly
  const schema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    category: Joi.string().min(1).max(30).required(),
    brand: Joi.string().min(1).max(30).required(),
    description: Joi.string().min(1).max(30).required(),
    price: Joi.string().min(1).max(30).required()
  });
  
  newItem = {
    name,
    category,
    brand,
    description,
    price,
    vendor-id: req.params.id
  }
  
  const item = new itemModel(request.body);

  try {
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

//______________________________________
//--------------------------------------

//delete item
exports.deleteItems = async (req, res) => {
  try {
    const item = await itemModel.findByIdAndDelete(req.params.id);

    if (!item) response.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

//______________________________________
//--------------------------------------

//update item
exports.updateItem = async (req, res) => {
  try {
    await itemModel.findByIdAndUpdate(req.params.id, req.body);
    await itemModel.save();
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

//______________________________________
//--------------------------------------

//view all items
module.exports.viewAllItems = async (req, res) => {
  const items = await userModel.find({req.params.user-id}).populate("Items");
  
  if(!items) return res.send("The user currently does not have any item")

  try {
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
};

//______________________________________
//--------------------------------------

//view specifi items
module.exports.viewSpecificItem = async (req, res) => {
  const item = await userModel.find({user-id === req.params.user-id}).populate('Items')
  
  if(!item) return res.send("No item found")

  try {
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};
