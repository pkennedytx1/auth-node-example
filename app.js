const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const UserModel = require('./model/model');

mongoose.connect("mongodb://mongo:27017/passport-jwt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

// const options = {
//   autoIndex: false, // Don't build indexes
//   reconnectTries: 30, // Retry up to 30 times
//   reconnectInterval: 500, // Reconnect every 500ms
//   poolSize: 10, // Maintain up to 10 socket connections
//   // If not connected, return errors immediately rather than waiting for reconnect
//   bufferMaxEntries: 0
// }

// const connectWithRetry = () => {
// console.log('MongoDB connection with retry')
// mongoose.connect("mongodb://mongo:27017/test", options).then(()=>{
//   console.log('MongoDB is connected')
// }).catch(err=>{
//   console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
//   setTimeout(connectWithRetry, 5000)
// })
// }

// connectWithRetry()

require('./auth/auth');

const routes = require('./routes/routes');
const secureRoute = require('./routes/secureRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(8080, () => {
  console.log('Server started.')
});