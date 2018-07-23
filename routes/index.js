var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/foodtruck', (req, res)=> {
//     request('http://data.sfgov.org/resource/bbb8-hzi6.json', function (error, response, body) {
//       // console.log('BODY: ', body);
//       res.json({
//         body: getAllOpenTrucks(JSON.parse(body))
//       })
//     });
//   }
// );

module.exports = router;
