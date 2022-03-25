
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const userRoute=  require('./route/userRoute');
const cardRoute=  require('./route/cardRoute');
const listRoute=  require('./route/listRoute');


mongoose.connect(
  'mongodb://localhost/testcases', 

);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to the database');
});
app.use(express.urlencoded());
app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/card', cardRoute);
app.use('/api/list', listRoute);


app.listen(port, (err, res) => {
  if (err) {
    console.log(`error to fire up the server: ${err}`);
    return;
  }
  console.log(`server is running on port : ${port}`);
});
module.exports = app;