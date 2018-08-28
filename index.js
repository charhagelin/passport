// main starting point of the application 
//maybe have to use require const express = require('express')
const express = require ('express');
const http = require ('http');
const bodyParser = require ('body-parser');
const morgan = require ('morgan');
const app = express();
const router = require ('./router')
const mongoose = require('mongoose');

//db setup
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true });


// mongoose.connect('mongodb://localhost:27017');
//app setup
app.use(morgan('combined')); //middleware - logging framework
app.use(bodyParser.json({ type: '*/*' })) //middleware - parsing incoming requests as if they are JSON
router(app);


//server setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on:', port);
console.log('server listening on:', port);