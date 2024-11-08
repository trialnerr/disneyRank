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
let collection;

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
  collection = client.db(dbName).collection('rappers');
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

//READ (get all rappers, return a rappers array)
app.get('/', async (req, res) => {
  try {
    const rappers = await collection.find().toArray();
    res.status(200).render('index.ejs', { rappers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering page');
  }
});
//CREATE (add a rapper to db)
app.post('/addRapper', async (req, res) => {
  try {
    await collection.insertOne({ ...req.body, likes: 0 });
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
});

//UPDATE (edit a rapper's likes)
app.put('/addLike', async (req, res) => {
  try {
    const { name, birthName } = req.body;
    const coll = db.collection('rappers');
    const rapper = await coll.findOne({
      name, birthName
    });
    if (!rapper) {
      res.status(404).send('Rapper not found');
    }
    await coll.updateOne(
      { name, birthName },
      { $set: { likes: rapper.likes + 1 } }
    );
    res.status(200).send('Rapper likes updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating likes');
  }
}
);

//DELETE (delete a rapper from db)
// app.delete('/rappers:id');
