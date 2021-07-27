//Base router to delete one of the products in the app
const items = require('../models/itemModels.js')

//Delete a product
exports.deleteItem = (req, res) => {
    let itemId = Number(req.params.id);
    let deleteItem = products.filter((item) => item.id !== itemId);
    if (!deleteItem) {
        return res.status(404).send(`Product ${itemId} not found`);
    } else {
        //return only the remaining products
        items = deleteItem;
        return res.json(items);
    }
}