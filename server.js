const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

const dist = __dirname + '/dist';

// the __dirname is the current directory from where the script is running
app.use(express.static(dist));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(dist, 'index.html'));
});

app.listen(port);
