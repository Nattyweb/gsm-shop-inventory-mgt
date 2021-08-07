
const dotenv = require("dotenv");
const userAuth = require("./middlewares/userAuth");
const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const db = require('./config/db');

// configure dotenv for environment variable
dotenv.config({ path: "./config.env" });

//connect database
db();

//body parser
app.use(express.json())

//home route
app.get('/', (req, res) => {
	res.send('<h1>Welcome to our HomePage. Signup to upload your products.</h1>')
})

//user routes
app.use('/api/v1/user', userRoutes)

//item routes
app.use('/api/v1/items', itemRoutes)


//no matching routes
app.get('/*', (req, res) => res.status(200).send('<h1>No marching url, check your url and try again</h1>'))



const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server running...`));
