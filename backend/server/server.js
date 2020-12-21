require('./config/config')

// Using Node.js `require()`
const express = require('express')
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Configuracion global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos online');
    });

//sockets
const index = require("./routes/socket");
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
let interval;


io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 5000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });

});

const getApiAndEmit = (socket) => {
    const randomInt = (min, max) => {
        return min + Math.floor((max - min) * Math.random());
    }
    var dateObj = new Date();
    var date = ('0' + dateObj.getDate()).slice(-2);

    var super_array = [];
    for (var i = 1; i <= date; i++) {
        var sub_array = [];
        sub_array.push(i, randomInt(1, 100));
        super_array.push(sub_array.slice(0));
    }

    const response = super_array;
    socket.emit("FromAPI", response);
};

server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));