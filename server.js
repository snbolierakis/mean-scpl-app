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

app.post('/api/authenticate',(req, res) =>{
  console.log(req.body);
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

})
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
