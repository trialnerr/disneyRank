const express = require('express');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const DEFAULT_PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Replace the placeholder with your Atlas connection string
const dbConnectionStr = process.env.DB_STRING;
const dbName = 'rappersDb';
let db;

//Note: Worked with Mike Pennisi
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(dbConnectionStr, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDB() {
  // Connect the client to the server (optional starting in v4.7)
  await client.connect();
  db = client.db(dbName);
  console.log('You successfully connected to MongoDB!');
}

connectToDB()
  .then(() =>
    app
      .listen(process.env.PORT || DEFAULT_PORT, () => {
        console.log(
          `the server is running on http://localhost:${
            process.env.PORT || DEFAULT_PORT
          }`
        );
      })
      .on('close', async () => {
        console.log('closed mongo client');
        await client.close();
      })
  )
  .catch(console.dir);

//READ (get all rappers)
app.get('/', async (req, res) => {
  try {
    const coll = db.collection('rappers');
    const allRappers = await coll.find().toArray();
    
  } catch (error) {
    console.log(error);
  }
});
//CREATE (add a rapper to db)
app.post('/rappers', async (req, res) => {
  try {
    const { name, birthDate } = req.body;
    const coll = db.collection('rappers');
    const dbResponse = await coll.insertOne({ name, birthDate });
    console.log(dbResponse);
    res.end();
  } catch (error) {
    console.log(error);
  }
});

//UPDATE (edit a rapper's likes)
app.post('/rappers:id')

//DELETE (delete a rapper from db)
app.delete('/rappers:id')