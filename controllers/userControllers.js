// ...
const bcrypt = require("bcrypt")
const express = require('express');
const mongoose = require('mongoose');
const userModel = require('../models/userModels');

//_________________________________________
//_________________________________________

//Sign up
module.exports.signup = async (req, res) => {
  let newUser = {
    {firstName, lastName, email}: req.body,
    password: bcrypt.hash(req.body.password,  10)
  }
  const user = new UserModel(newUser);

  try {
    await user.save();
    res.json({msg: "You are now registered" , user});
  } catch (error) {
    res.status(500).send(error);
  }
};

//_________________________________________
//_________________________________________

//sign in
module.exports.signin = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    
    //check if user exist im database
    user = userModel.findOne({email});
    if(!user) return res.send("No account found")
    
    //if user exist, check if password is correct
    validPassword= bcrypt.compare(password,   user.password);
    if(!validPassword) return res.send("invalid password")
    //if password is valid, generate a token
    const id = user._id
    const token = jwt.sign({id, email}, process.env.SECRET, {
      expiresIn: "2h"
      
    })
    user.token = token;
    res.status(200).send(user)
  
  } catch (error) {
  res.status(500).send(error);
    
  }
}

//_________________________________________
//_________________________________________

// update user
exports.updateUser = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.params.id, req.body);
    await userModel.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

//_________________________________________
//_________________________________________

// change password
exports.changePassword = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.params.id, req.body);
    await userModel.save();
    res.send('password changed');
  } catch (error) {
    res.status(500).send(error);
  }
};

//_________________________________________
//_________________________________________


//delete user
exports.delete = async (request, response) => {
  try {
    const user = await userModel.findByIdAndDelete(request.params.id);

    if (!user) response.status(404).send("No item found");
    res.status(200).send("user deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

// ...

// ...