const express = require('express');
const mongoose = require('mongoose');
const { getUser } = require('./createUser');

module.exports.changePassword = (reg, res, next) => {
    const { email, newPasssword} = req.body;
    Users.findOneAndUdate({email}, )

}