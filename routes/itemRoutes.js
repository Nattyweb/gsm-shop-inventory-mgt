
const express = require('express');
const router = express.Router();
const itemControllers = require("../controllers/itemControllers");
const userAuth = require("../middlewares/userAuth");

//create item
router.post("/create", userAuth, itemControllers.createItem);

//view all items
router.get("/", userAuth, itemControllers.viewAllItemsOfUser);

//view specific item 
router.get("/:itemId", userAuth,  itemControllers.viewSpecificItemOfUser);


//update item details
router.put("/update", userAuth, itemControllers.updateItem);

//delete item
router.delete("/delete", userAuth,  itemControllers.deleteItem);

module.exports = router