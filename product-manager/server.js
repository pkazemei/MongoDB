const express = require('express') //import express
const cors = require('cors') //import cors

const app = express(); //instance of express
const port=8000; //instance of port

// read post requests
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//connecting to mongoDB using mongoose
require('./server/config/config')

//import routes, passing app
require('./server/routes/routes')(app)

app.listen(port, ()=>console.log(`Listening on port: ${port}`));