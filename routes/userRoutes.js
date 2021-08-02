
const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/userControllers");

//create user routes
router.post("/signup", userControllers.createUser);

router.post("/signin", userControllers.signin);

//change password router
router.post("/changepassword", userControllers.changePassword)

//update user details
router.put("/user/update", userControllers.updateUser);

//delete user 
router.delete("/user/delete", userControllers.deleteUser);

module.exports = router