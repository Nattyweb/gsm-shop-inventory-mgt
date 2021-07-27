//Base router to creates a new product in the app
const items = require('../models/itemModels.js')

//Create a post request 
exports.createItem = (req, res) => {

    if (!req.body.name || !req.body.description || !req.body.image || !req.body.price) {
        return res.status(400).send('All fields marked with * are required.')
    } else {

        //Creating a new product
        let newItem = {
            id: item.length + 1,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price
        }
        //adding product to the products array and display list of products
        items.push(newItem);
        return res.json(items)

    }

}