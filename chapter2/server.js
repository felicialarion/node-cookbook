var http = require('http');
var querystring = require('querystring');
var util = require('util');
var form = require('fs').readFileSync('form.html');
http.createServer(function(req, res){
	if(req.method == "GET"){
		res.writeHead(200, {'Content-type': 'text/html'});
		res.end(form);
	}
	if(req.method == 'POST'){
		var postData = '';
		req.on('data', function(chunk){
			postData += chunk;
		}).on('end', function(){
			var postDataObj = querystring.parse(postData);
			console.log('User posted: '+postDataObj);
			res.end('You posted: '+ util.inspect(postDataObj));
		})
	}
}).listen(8080);