//base routing
/*var http = require('http');
var path = require('path');

var pages = [
	{route: '', output: 'Woohoo!'},
	{route: 'about', output: 'A simple routing with Node example'},
	{route: 'another_page', output: function() {return 'Here\'s '+this.route;}},
];

http.createServer(function(req,res){
	var lookup = path.basename(decodeURI(req.url));
	pages.forEach(function(page){
		if(page.route === lookup){
			res.writeHead(200, {'Content-type': 'text/html'});
			res.end(typeof page.output === 'function'? page.output() : page.output);		
		}

	});
	if(!res.finished){
		res.writeHead(400);
		res.end('Page not found');
	}

}).listen(8080)*/

//basic routing

//Serving static content

/*var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
	'.js' : 'text/javascript',
	'.html' : 'text/html',
	'.css' : 'text/css'
};

http.createServer(function(req,res){
	var lookup = path.basename(decodeURI(req.url)) || 'index.html';
	var f = 'content/'+lookup;
	if(req.url === '/favicon.ico'){
		console.log('Not found '+f);
		res.writeHead(404);
		res.end();
		return;
	};

	fs.exists(f, function(exists){
		if(exists){
			fs.readFile(f, function(err, data){
				if(err){
					res.writeHead(500);
					res.end('Server error!');
					return;
				}

				var headers = {'Content-type' : mimeTypes[path.extname(lookup)]};
				res.writeHead(200, headers);
				res.end(data);
			});
			return;	
		}
		res.writeHead(404);
		res.end();
	});

}).listen(8080)
*/

//end serving static content

//Serving static content + caching

var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
	'.js' : 'text/javascript',
	'.html' : 'text/html',
	'.css' : 'text/css'
};

var cache = {};
function cacheAndDeliver(f,cb){
	fs.stat(f, function(err, stats){
		if(err){return console.log('Error ', err);}
		var lastChanged = Date.parse(stats.ctime);
		isUpdated = (cache[f]) && (lastChanged > cache[f].timestamp);
		if(!cache[f] || isUpdated){
			fs.readFile(f, function(err, data){
				if(!err){
					cache[f] = {content: data, timestamp: Date.now()};
				}
				cb(err,data);
			});
			return;
		}
		console.log('loading '+ f + ' from cache');
		cb(null, cache[f].content);
	})
};

http.createServer(function(req,res){
	var lookup = path.basename(decodeURI(req.url)) || 'index.html';
	var f = 'content/'+lookup;
	if(req.url === '/favicon.ico'){
		console.log('Not found '+f);
		res.writeHead(404);
		res.end();
		return;
	};

	fs.exists(f, function(exists){
		if(exists){
			cacheAndDeliver(f, function(err, data){
				if(err){
					res.writeHead(500);
					res.end('Server error!');
					return;
				}

				var headers = {'Content-type' : mimeTypes[path.extname(f)]};
				res.writeHead(200, headers);
				res.end(data);
			});
			return;	
		}
		res.writeHead(404);
		res.end();
	});

}).listen(8080)

//end serving static content + caching