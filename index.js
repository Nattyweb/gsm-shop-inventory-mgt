const express = require('express');
const app = express();

//This would import products.
const itemRoutes = require('./routes/itemRoutes.js')
const userRoutes = require('./routes/userRoutes.js')

const PORT = process.env.PORT || 8080;

//parse json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Create item routes
app.use('/products', itemRoutes);

// User routes
app.use('/users', userRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on http://127.0.0.1:${PORT}`)
})