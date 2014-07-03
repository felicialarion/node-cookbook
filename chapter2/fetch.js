var http = require('http');
var urlOpts = {host: 'www.nodejs.org', path: '/', port: '80'};
http.get(urlOpts, function(res){
	res.on('data', function(chunk){
		console.log(chunk.toString());
	});
})