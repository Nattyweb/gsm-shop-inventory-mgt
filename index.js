

const userAuth = require("./middlewares/userAuth");
const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/itemRoutes');
const db = require('./config/db');

//connect database
db();

//body parser
app.use(express.json())

//home route
app.get('/', (req, res) => {
	res.send('<h1>Welcome to our HomePage. Signup to upload your products.</h1>')
})

//user routes
app.use('/user', userRoutes)

//item routes
app.use('/', userAuth, itemRoutes)


//no matching routes
app.get('/*', (req, res) => res.status(200).send('<h1>No marching url, check your url and try again</h1>'))



const PORT = 8000
app.listen(PORT, () => console.log(`Server running...`));
