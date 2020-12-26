const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectID;
const port = 5000;
require('dotenv').config();

const app = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vw2gd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const productCollections = client.db("shoppingCart").collection("products");

  app.get('/products', (req, res) => {
    productCollections.find({})
      .toArray((err, document) => {
        res.send(document)
      })
  })


  app.post('/products', (req, res) => {
    productCollections.insertMany(products)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  app.get('/', (req, res) => {
    res.send('Hello shopping cart')
  })

  app.listen(process.env.PORT || port)

});

