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
const dbName = 'disneyRank';
let collection;

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
  collection = client.db(dbName).collection('movies');
  console.log('You successfully connected to MongoDB!');
}
//worked with Mike Pennisi
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

// READ (get all rappers, return a rappers array)
app.get('/', async (req, res) => {
  try {
    const movies = await collection.find().sort({ likes: -1 }).toArray();
    res.status(200).render('index.ejs', { movies });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering page');
  }
});

//CREATE (add a song to db)
app.post('/movies', async (req, res) => {
  try {
    const { name, song } = req.body; 
    const songInDB = await collection.findOne({ song });
    if (!songInDB) {
      await collection.insertOne({ ...req.body, likes: 0 });
    }
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
});

//UPDATE add a like to the song
app.put('/likeMovie', async (req, res) => {
  try {
    const { name, song } = req.body;
    await collection.updateOne(
      {
        name,
        song
      },
      {
        $inc: { likes: 1 },
      }
    );
    res.status(200).send('Song likes increased');
  } catch (error) {
    console.error('Error add likes', error);
    res.status(500).send('Error updating likes');
  }
});

//UPDATE (edit a songs's likes)
app.put('/dislike', async (req, res) => {
  try {
    const { name, song } = req.body;
    await collection.updateOne(
      {
        name,
        song,
      },
      {
        $inc: { likes: -1 },
      }
    );
    res.status(200).send('Song likes reduced');
  } catch (error) {
    console.error('Error add likes', error);
    res.status(500).send('Error updating likes');
  }
});


//DELETE (delete a song from db)
app.delete('/delete', async (req, res) => {
  try {
    await collection.deleteOne(req.body);
    res.status(200).send('Song deleted');
  } catch (error) {
    console.error('Error deleting rapper', error);
    res.status(500).send('Error deleting song');
  }
})



