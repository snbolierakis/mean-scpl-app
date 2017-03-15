//Get Dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyparser = require('body-parser');
const config = require('./server/config.js');
const jwt    = require('jsonwebtoken');
const morgan      = require('morgan');

//Get our api routes
const api = require('./server/routes/api');
const cors = require('cors');
const app = express();

//DB connection
const mongoose = require('mongoose');
const User = require('./server/database/db');
const API = 'http://localhost:3000/api/deals';

mongoose.connect(config.database);
app.set('superSecret', config.secret);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//Parsers for POST data
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

app.use(morgan('dev'));
app.use(cors());


/*User.find(function (err, users) {
  if (err) return console.error(err);
  console.log(users.length);
})*/
function setUserInfo(user){
  return{
    profile: user.profile,
    email: user.email,
    role: user.role
  }
}

function auth(req, res, next) {

  // check header or url parameters or post parameters for token
  //console.log(req.headers);
  var token = req.body.token || req.query.token || req.headers['authorization'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
}


app.post('/api/authenticate',(req, res) =>{
  //console.log(req.body);
  User.findOne({email: req.body.username},function (err, user) {
    console.log(user);
    if (err) return console.error(err);
    if (user){
      user.comparePassword(req.body.password,function(err, isMatch){
        if(isMatch){
          var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: '24h' // expires in 24 hours
        });
          var userinfo = setUserInfo(user);
          res.status(200).send({
            token: token,
            userInfo: userinfo,
            error: false
          });
        }
      });

    }
  else{
        res.status(404).send({error: true, message: "User not found check values again"});
  }
  });

});

//app.use(auth);
app.get('/api/private',auth,(req,res)=>{
  //console.log(req.body);
  let deals = [
  {
    id: 14423,
    name: 'Tesla S',
    description: 'Ride in style and say goodbye to paying for gas. The Tesla S is the car of the future.',
    originalPrice: 90000.00,
    salePrice: 75000.00
  },
  {
    id: 14553,
    name: 'DJI Phantom 4',
    description: 'The Drone revolution is here. Take to the skies with the DJI Phantom 4.',
    originalPrice: 1299.99,
    salePrice: 749.99
  },
  {
    id: 15900,
    name: 'iPhone 7 - Jet Black',
    description: 'Get the latest and greatest iPhone in the limited edition jet black.',
    originalPrice: 899.99,
    salePrice: 799.99
  },
  {
    id: 16000,
    name: '70" Samsung 4K HDR TV',
    description: 'Watch as if you were there with the latest innovations including 4K and HDR.',
    originalPrice: 2999.99,
    salePrice: 2499.99
  },
  {
    id: 17423,
    name: 'Canon t8i DSLR',
    description: 'Capture life\'s moments with the amazing Canon t8i DSLR',
    originalPrice: 999.99,
    salePrice: 549.99
  },
  {
    id: 17423,
    name: 'Xbox One S',
    description: 'Get the latest Xbox and play the best first party games including Gears of War and Forza.',
    originalPrice: 299.99,
    salePrice: 279.99
  },
  ];
  res.json(deals);
});

app.get('/api/features',(req,res)=>{
  //console.log(req.body);
  let features = {
    "type": "FeatureCollection",
    "features": [
      { "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [23.678112, 37.965956]},
        "properties": {"prop0": "value0"}
      }]
    };
  res.json(features);
});


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
