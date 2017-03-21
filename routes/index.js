var express = require('express');
var router = express.Router();

var db = require('./queries');


router.get('/api/dreamers', db.getAllDreamers);
router.get('/api/dreamer/:id', db.getSingleDreamer);
router.post('/api/dreamer', db.createDreamer);
router.post('/api/dream', db.createDream);
// router.delete('/api/dreamer/:id', db.removeDreamer);


module.exports = router;
