var profiles = require('./profiles');
var xml2js = require('xml2js');
var builder = new xml2js.Builder({rootName: 'profiles'});
profiles = builder.buildObject(profiles);
console.log(profiles);

xml2js.parseString(
	profiles, 
	{
		explicitArray: false,
		explicitRoot: false
	},
	 function(err, obj){
	console.log('reverted ', obj);
})