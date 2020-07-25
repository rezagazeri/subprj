const express = require('express');
const app = express();
const Route = require('../src/app/route').Route;
const redis = require('redis');

const client = redis.createClient(6379, '127.0.0.1');

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});


const route = new Route(app, client);
route._run();

const port = 3000;
app.listen(port, () => {
    console.log('app is running on port 3000')
});