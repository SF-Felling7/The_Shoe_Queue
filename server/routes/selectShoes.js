//REQUIRES
var express = require( 'express' );
var router = express.Router();
var passport = require( 'passport' );
var Shoe = require( '../models/shoes_model.js' );
var path = require( 'path' );

router.get( '/:weatherDescription', function( req, res ) {
console.log( 'hit weatherDescription route', req.params );
console.log( 'userid', req.user);
var weather;

//going through weather conditions to equal clear skies
if (req.params.weatherDescription === 'scattered clouds' || req.params.weatherDescription === 'few clouds' || req.params.weatherDescription === 'broken clouds') {
  weather = 'clear sky';
}
if (req.params.weatherDescription === 'shower rain' || req.params.weatherDescription === 'thunderstorm' || req.params.weatherDescription === 'mist') {
  weather = 'rain';
}
Shoe.find({ userid: req.user._id, climate: weather }, function( err, results ) {
// console.log( 'userid: ', req.user._id, 'climate: ', req.climate._id );
  if( err ){
    console.log( err );
    res.sendStatus( 500 );
  }else{
    console.log( 'successful weatherDescription ->', results );
    res.status( 200 ).send( results );
  }
});

});//ending get


module.exports = router;
