const express = require('express')
const app = express()
const dotenv = require('dotenv');
const Product = require("./models/productModels.js")

const mongoose = require('mongoose');


app.use(express.json());
app.use(express.urlencoded({ extended:false}));

require('dotenv').config()
const port = 3000


mongoose.set("strictQuery", false)
mongoose.connect(process.env.DATABASE_URL)
.then(() => {
  app.listen(port, () => {
  console.log(`Node API Running on ${port}`) 
})
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

app.get("/product", async(req, res) => {
  try{
    const products = await Product.find({})
    res.status(200).json(products)

  } catch(err) {
    res.status(500).json({message: err.message})
  }
})

app.get("/product/:id", async(req, res) => {
  try{
    const {id} = req.params;
    const product = await Product.findById(id)
    // console.log(product)
    res.status(200).json(product)

  } catch(err) {
    res.status(500).json({message: err.message})
  }
})


app.post('/product', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch(err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

app.put("/product/:id", async(req, res) => {
  try{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if(!product) {
      return res.status(404).json({message:`connit find any product with ID ${id}`});
    }
    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct);

  } catch(err) {
    res.status(500).json({message: err.message})
  }
})


app.delete('/product/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product) {
      return res.status(404).json({message: `Product not found with ID ${id}`});
    }
    res.status(200).json(product);
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})
