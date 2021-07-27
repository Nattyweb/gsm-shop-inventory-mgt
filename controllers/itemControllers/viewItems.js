//Base router for to import or displays all the products in the app
const items = require('../models/itemModels.js')

//Create another router to get all products.

exports.getItem = (req, res) => {
    return res.json(items);
}

//Create route to get a specific product

exports.getSpecificItem = (req, res) => {
    let itemId = Number(req.params.id);
    let findItem = items.find((item) => item.id === itemId);

    //stage for sending an error message, if the item id is not found
    if (!findItem) {
        return res.status(404).send(`Item ${itemId} not available!`);
    } else {
        return res.json(findItem);
    }

}