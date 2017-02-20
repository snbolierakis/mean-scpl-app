//Get Dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyparser = require('body-parser');

//Get our api routes
const api = require('./server/routes/api');
const cors = require('cors');
const app = express();

//Parsers for POST data
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);


app.use(cors());


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
