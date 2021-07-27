
const express = require("express");
createItem  = require("../controllers/itemControllers/createItems");
viewItem = require("../controllers/itemControllers/viewItems");
updateItem  = require("../controllers/itemControllers/updateItems");
deleteItem  = require("../controllers/itemControllers/deleteItems");


const router = express.Router();

//view all items

router.get("/", viewItem.getSpecificItem);

//view all items
router.get("/:id", viewItem.viewAllItems);

//create item
router.post("/", createItem.createItem);

//update item
router.put("/", updateItem.updateItem);

//delete items
router.delete('/', deleteItem.deleteItem)

module.exports = router