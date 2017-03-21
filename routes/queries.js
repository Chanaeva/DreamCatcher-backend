var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.NODE_ENV == "production" ? process.env.DATABASE_URL:'postgres://localhost:5432/dreamers';
var db = pgp(connectionString);



function getAllDreamers(req, res, next) {
  db.any('select * from dreams')
  .then(function (data) {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL dreamers'
    });
  })
  .catch(function (err) {
    return next(err);
  });
}

function getSingleDreamer(req, res, next) {
  var dreamID = parseInt(req.params.id);
  db.one('select * from dreams where id = $1', dreamID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE dreamer'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createDream(req, res, next) {
  db.none('insert into dreams(date, dream, email )' +
      'values(${date}, ${dream}, ${email})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one dream'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createDreamer(req, res, next) {
  db.none('insert into dreams(date, dream, username, email)' +
      'values(${date}, ${dream}, ${username}, ${email})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one dreamer'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllDreamers: getAllDreamers,
  getSingleDreamer: getSingleDreamer,
  createDreamer: createDreamer,
  createDream: createDream,
  // removeDreamer: removeDreamer
};
