// ...
const express = require('express');
const mongoose = require('mongoose');
const itemModel = require('../models/itemModel');
const Joi = require("joi");

//______________________________________
//--------------------------------------

//create item
module.exports.createItem = async (req, res, Next) => {
  const {name, category, brand, description, price} = req.body
  //validate that the required item details are entered correctly
  const schema = Joi.object().keys({
    name: Joi.string().min(1).max(30).required(),
    category: Joi.string().min(1).max(30).required(),
    brand: Joi.string().min(1).max(30).required(),
    description: Joi.string().min(1).max(30).required(),
    price: Joi.string().min(1).max(30).required()
  });
  
  const {error} = schema.validate(req.body);
  if(error) return res.send(error.details[0]. message);
  
  newItem = {
    name,
    category,
    brand,
    description,
    price,
    userId: req.user._id
  }
  
  const item = new itemModel(newItem);

  try {
    await item.save();
    return res.json({msg: "item added", item});
  } catch (error) {
    return res.status(500).send(error);
  }
};

//______________________________________
//--------------------------------------

//delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await itemModel.findById(req.params.id);

    if(!item) return res.status(404).send("No item found");
    
    if(item.userId != req.user._id) return res.status(400).send("You can't delete this Item")
    
    await userModel.findByIdAndDelete(req.params.id)
    
    return res.status(200).send("item deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

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
};

//______________________________________
//--------------------------------------

//view all items
module.exports.viewAllItemsOfUser = async (req, res) => {
  try {
    const items = await itemModel.findById({userId: req.user._id});
    
    if(!items) return res.send("The user currently does not have any item");
    
    return res.status(201).send(items);
  } catch (error) {
    res.status(500).send(error);
  }
};

//______________________________________
//--------------------------------------

//view specifi items
module.exports.viewSpecificItemOfUser = async (req, res) => {
  const item = await userModel.find({userId: req.user._id, id: req.params.id})
  
  if(!item) return res.status(404).send("No item found")

  try {
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};
