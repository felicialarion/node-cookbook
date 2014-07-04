var http = require('http');
var fs = require('fs');
var path = require('path');
var profiles = require('./profiles');
var xml2js = require('xml2js');

var index = fs.readFileSync('index.html');
var routes, mimes = {xml: 'application/xml', json: 'application/json'};

function output(content, format, rootNode){
	if(!format || format === 'json'){
		return JSON.stringify(content);
	}

	if(format === 'xml'){
		return (new xml2js.Builder({
			rootName: rootNode
		})).buildObject(content);
	}
}

routes = {
	'profiles' : function(format){
		return output(Object.keys(profiles), format);
	},
	'/profile': function(format, basename){
		return output(profiles[basename],format, basename);
	}
}

http.createServer(function(req, res){
	var dirname = path.dirname(req.url),
		extname = path.extname(req.url),
		basename = path.basename(req.url, extname);
	extname = extname.replace('.', '');
	res.setHeader("Content-type", mimes[extname] || 'text/html');

	//'/profile'
	if(routes.hasOwnProperty(dirname)){
		res.end(routes[dirname](extname, basename));
		return;
	}
	// 'profiles'
	if(routes.hasOwnProperty(basename)){
		res.end(routes[basename](extname));
		return;
	}

	//default index page
	res.end(index);
}).listen(8080);