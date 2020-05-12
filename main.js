const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const BASE_URL = 'https://www.reddit.com/r/earthporn/search.json?restrict_sr=1&q=';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome, this is a server for image search app.',
  });
});

app.get('/search', async (req, res) => {
  const { q } = req.query;

  const response = await fetch(`${BASE_URL}${q}`);
  const { data: { children } } = await response.json();

  const images = children.map(({ data: { url } }) => url);

  res.json({
    images,
  });
});

const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});
