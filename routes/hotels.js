var mongo = require('mongodb');
 
var Db = mongo.Db,
    BSON = mongo.BSONPure;
// mongodb://<user>:<pass>@mongo.onmodulus.net:27017/oreZan8u

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(
  'mongodb://root:root@mongo.onmodulus.net:27017/oreZan8u',
  function(err, db) {
    Db = db
  }
);

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving hotel: ' + id);
    Db.collection('hotel', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    Db.collection('hotel', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addHotel = function(req, res) {
    var hotel = req.body;
    console.log(hotel);
    Db.collection('hotel',function(err, collection) {
	collection.count(function(err, count){
		var options = {
		    "limit": 1,
		    "skip": count-1
		}
		collection.find({},options).toArray(function(err , item){
		    var last_id;
		    if(item == null){
			last_id = "0";
		    }else{
			last_id =item[0].id_hotel;
		    }
		    
		    hotel.id_hotel= parseInt(last_id, 10) + 1;
			console.log('Adding hotel: ' + JSON.stringify(hotel));
			Db.collection('hotel', function(err, collection) {
			    collection.insert(hotel, {safe:true}, function(err, result) {
				if (err) {
				    res.send({'error':'An error has occurred'});
				} else {
				    console.log('Success: ' + JSON.stringify(result[0]));
				    res.send(result[0]);
				}
		            });
		    });
		});	
	});
    });
    


}
 
exports.updateHotel = function(req, res) {
    var id = req.params.id;
    var hotel = req.body;
    console.log('Updating hotel: ' + id);
    console.log(JSON.stringify(hotel));
    Db.collection('hotel', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, hotel, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating hotel: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(hotel);
            }
        });
    });
}
 
exports.deleteHotel = function(req, res) {
    var id = req.params.id;
    console.log('Deleting hotel: ' + id);
    Db.collection('hotel', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
//buscar por id_Hotel
exports.findById_Hotel = function(req, res) {
    var id_hotel = req.params.id_hotel;
    console.log('Retrieving hotel: ' + id_hotel);
    Db.collection('hotel', function(err, collection) {
        collection.findOne({'id_hotel':id_hotel}, function(err, item) {
            res.send(item);
        });
    });
};
//buscar por Estrella
exports.findByEstrella = function(req, res) {
    var estrella = req.params.estrella;
    console.log('Retrieving hotel: ' + estrella);
    Db.collection('hotel', function(err, collection) {
        collection.findOne({'estrella':estrella}, function(err, item) {
            res.send(item);
        });
    });
};
//buscar el ultimo id_hotel
exports.lastId_Hotel = function(req,res){
    Db.collection('hotel',function(err, collection) {
	collection.count(function(err, count){
		var options = {
		    "limit": 1,
		    "skip": count-1
		}
		collection.find({},options).toArray(function(err , item){
		    console.log(item[0].id_hotel);
		    res.send(item);
		});	
	});
    });	
};

