
const express = require('express');
const router = express.Router();
const itemControllers = require("../controllers/itemControllers");

//create item
router.post("/createitem/:user-id", itemControllers.createItem);

//view all items
router.get("/items:user-id", itemControllers.viewAllItems);

//view specific item 
router.get("/:item-id/:user-id", itemControllers.viewSpecificItem);


//update item details
router.put("/user/updateitem", itemControllers.updateItem);

//delete item
router.delete("/item/delete", itemControllers.deleteItem);

module.exports = router