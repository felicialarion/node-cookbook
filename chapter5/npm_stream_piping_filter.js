//Consuming streams and piping
var http = require('http'),
	JSONStream = require('JSONStream'),
	feed = 'http://isaacs.iriscouch.com/registry/_changes?feed=continuous',
	ready = false;

function decide(cb){
	console.log('deciding');
	setTimeout(function(){
		if(Date.now() % 2) {
			return console.log('rejected');
		}
		ready = true;
		cb();
	}, 2000);
}

http.get(feed, function(res){
	decide(function(){ 
		res.pipe(JSONStream.parse('id')).pipe(process.stdout);
	})
})