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


  // app.post('/register', (req, res) => {
  //   const registerData = req.body.eventRegister;
  //   const { email, title } = registerData;

  //   registerVolunteerCollections.find({ email: email, title: title })
  //     .toArray((err, document) => {
  //       if (document.length > 0) {
  //         res.send('false')
  //       } else {
  //         registerVolunteerCollections.insertOne(registerData)
  //           .then(result => {
  //             res.send(result.insertedCount > 0)
  //           })
  //       }
  //     })
  // });




  // Volunter and admin delete registration
  // app.delete("/deleteRegistration/:id", (req, res) => {
  //   const id = req.params.id;
  //   registerVolunteerCollections.deleteOne({ _id: ObjectId(id) })
  //     .then((result) => {
  //       res.send(result);
  //     });
  // });

  // // admin change registration status
  // app.patch("/changeStatus", (req, res) => {
  //   const changeStatus = req.body.changeStatus;

  //   registerVolunteerCollections.updateOne(
  //     { _id: ObjectId(changeStatus.id) },
  //     {
  //       $set: {
  //         status: changeStatus.status
  //       }
  //     })
  //     .then((result) => {
  //       res.send(result);
  //     });
  // });
