// ...
const bcrypt = require("bcryptjs")
const express = require('express');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const Joi = require("joi");
const jwt = require("jsonwebtoken");

//_________________________________________
//_________________________________________

//Sign up
module.exports.signup = async (req, res) => { 
  try {
    //validate input
    const schema = Joi.object().keys({ 
      firstName: Joi.string().min(1).max(30).required(),
      lastName:Joi.string().min(1).max(30).required(),
      birthYear: Joi.number().integer().min(1900).max(2013),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required(),
      confirmPassword: Joi.ref('password')
      
    });
    
    // validate request body against schema
    const { error, value } = schema.validate(req.body);
    if (error) {
      // on fail return comma separated errors
      return res.status(400).send(error.details[0].message); 
      
    }
    
    const {firstName, lastName, birthYear, email, password, condirmPassword} = req.body;
    
    //hash password
    const hashedPassword = await bcrypt.hash(password,  10);
    
    let newUser = {
      firstName,
      lastName,
      birthYear,
      email,
      password: hashedPassword 
      
    } 
    //add new user to database 
    const user = await new userModel(newUser); 
    await user.save();
    return res.json({msg: "You are now registered", user});
    
  } catch (error) {
    return res.status(500).send(error);
  }
};

//_________________________________________
//_________________________________________

//sign in
module.exports.signin = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    
    //check if user exist im database
    user = await userModel.findOne({email});
    if(!user) return res.send("No account found")
    
    //if user exist, check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.send("invalid password")
    //if password is valid, generate a token
    const id = user._id
    const token =  jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: '2h'
      
    })
    user.token = token;
    console.log(user.token)
    return res.status(200).json({msg: "Welcome", token, user})
  next()
  } catch (error) {
  return res.status(500).json(error);
    
  }
}

//_________________________________________
//_________________________________________

// update user
module.exports.updateUser = async (req, res) => {
  try {
   const user = await userModel.findByIdAndUpdate(req.user._id);
   
   user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
   user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
   user.birthYear = req.body.birthYear ? req.body.birthYear : user.birthYear;
  
    await user.save();
    return res.json({msg: "Your details have been updated", user});
  } catch (error) {
    res.status(500).send(error);
  }
};

//_________________________________________
//_________________________________________

// change password
module.exports.changePassword = async (req, res) => {
  //validate that the user entered the new password and the confirmation 
  
  const {newPassword, confirmPassword} = req.body
  schema = Joi.object().keys({
    newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmNewPassword: Joi.ref('password')
  });
  const {error} = schema.validate(req.bod);
  if(error) return res.send(error.details[0]. message);

  //hash new password
  const hashedPassword = bcrypt.hash(newPassword)
  
  try {
    await userModel.findByIdAndUpdate(req.user._id, {password: hashedPassword});
    await userModel.save();
    return res.send('password changed successfully');
  } catch (error) {
    res.status(500).send(error);
  }
};

//_________________________________________
//_________________________________________


//delete user
module.exports.deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.user._id);

    if (!user) response.status(404).send("No user found");
    res.status(200).send("account deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

// ...

// ...