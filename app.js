const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const UserModel = require('./model/model');
const app = express();
const http = require('http').Server(app);
const redis = require('redis');
const io = require('socket.io')(http);

mongoose.connect("mongodb://mongo:27017/passport-jwt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');

const routes = require('./routes/routes');
const secureRoute = require('./routes/secureRoutes');
const Subscribe = redis.createClient(process.env.REDIS_URL);
const Publish = redis.createClient(process.env.REDIS_URL);

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.get('/publish', (req, res) => {
  Publish.publish("example", "Hello, we are sending this to the subs");
  res.send("Pubslihed message");
})

app.get("/subscriber", (req, res) => {
  res.sendFile('subscriber.html', { root: __dirname })
})

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

http.listen(8080, () => {
  console.log('Server started.')
});

Subscribe.on("message", (channel, msg) => {
  console.log(msg);
  console.log(channel);
  console.log(msg);
  io.sockets.emit(channel, msg);
})

Subscribe.subscribe("example");