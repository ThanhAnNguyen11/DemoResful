var express = require('express');
var fs = require('fs');
var router = express.Router();
/*lấy dữ liệu students*/
var db = require('../models/students');

/* GET student listing. */
router.get('/students', function(req, res, next) {
    var page = parseInt(req.query.page);
    res.send(db);
    res.json({"page":page})
    /*var some1 = db.splice(0,9);
    var some2 = db.splice(10,19);
    switch(page){
        case 1:
            res.send(some1);
            break;
        case 2:
            res.send(some2);
            break;
        default:
            res.send(db);
            break;
    }*/
});

/*Get a student*/
router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    for (var i = 0; i < db.length; i++) {
        if (db[i].id === id) {
            res.send(db[i]);
        }
    }
    res.send('Not found');
});

/*Update students*/
router.put('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    var data = req.body;
    for (var i = 0; i < db.length; i++) {
        if (db[i].id === id) {
            console.log(db[i]);
            db[i] = data;
            console.log('----------');;
            console.log(db[i]);
        }
    }
    res.send("Not found");
});

/*Create new a student*/
router.post('/', function(req, res, next) {
    var data = req.body;
    db.push(data);
    res.send("OK");
});

/*Delete a students*/
router.delete('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    console.log(id);
    for (var i = 0; i < db.length; i++) {
        if (db[i].id === id) {
            db.splice(i, 1);
            res.send("OK");
        }
    }
    res.send("Not Found");
});

module.exports = router;
