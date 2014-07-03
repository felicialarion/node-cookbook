var connect = require('connect');
var bodyParser = require('body-parser');
var util = require('util');
var form = require('fs').readFileSync('form.html');
connect()
.use(connect.limit('2mb'))
.use(connect.bodyParser())
.use(function(req, res){
	if(req.method === "POST"){
		console.log('user posted '+ req.body.userinput1);
		res.end('you posted ' + util.inspect(req.body) );
	}

	if(req.method === "GET"){
		res.writeHead(200, {'Content-type': 'text/html'});
		res.end(form);
	}
})
.listen(8080);