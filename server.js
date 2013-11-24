var express = require('express'),
    hotel = require('./routes/hotels');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/hotels', hotel.findAll);
app.get('/hotels/:id', hotel.findById);
app.get('/hotels/id_hotel/:id_hotel', hotel.findById_Hotel);
app.get('/hotels/estrella/:estrella', hotel.findByEstrella);
app.post('/hotels', hotel.addHotel);
app.put('/hotels/:id', hotel.updateHotel);
app.delete('/hotels/:id', hotel.deleteHotel);
 
app.listen(3000);
console.log('Listening on port 3000...');
