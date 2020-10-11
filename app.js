var express = require('express');
var app = express();
var mongoose = require('mongoose');
var PORT = 5000
var {MONGOURI} = require('./keys');
var user = require('./models/user');

app.use(express.json());
app.use(require('./routes/auth'));


mongoose.connect(MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', function() {
    console.log("CONNECTED!!");
});
mongoose.connection.on('error', function(err) {
    console.log(err);
});

app.listen(PORT, function() {
    console.log("Server started on http://localhost:5000");
})