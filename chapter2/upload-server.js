var http = require('http');
var formidable = require('formidable');
var form = require('fs').readFileSync('upload-form.html');

http.createServer(function(req, res){
	if(req.method === 'POST'){
		var incoming = new formidable.IncomingForm();
		incoming.uploadDir = 'uploads';
		//incoming.keepExtensions = true;
		incoming.on('file', function(field, file){
			res.write('File '+file.name+ ' received');
		})
		.on('fileBegin', function(field, file){
			if(file.name){
				file.path +="-"+file.name; 
			}
		})
		.on('end', function(){
			res.end('All files recived');
		})

		incoming.parse(req);
	}
	if(req.method == 'GET'){
		res.writeHead(200, {'Content-type': 'text/html'});
		res.end(form);
	}
}).listen(8080);