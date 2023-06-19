const express = require('express')
const app = express()
const dotenv = require('dotenv');

const mongoose = require('mongoose');


require('dotenv').config()
const port = 3000

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log('Connected Mongoose!')
}).catch((err) => {
    console.error(err)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/blog', (req, res) => {
    res.send('Hello Nomain!')
  })

app.listen(port, () => {
  console.log(`Node API Running on ${port}`) 
})