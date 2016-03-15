var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var utils = require('./utils');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(__dirname + '/public'));

app.get('/404', function(req, res) {
	res.send('<p>/* 404 */</p>');
});

app.post('/', function(req, res) {
	var longUrl = req.body.longUrl;
	utils.set(longUrl, function(result) {
		if (result.is_url) {
			res.json(result);
		} else {
			res.json({
				err: 'Not a URL'
			});
		}
	});
});

app.get('/ip', function(req, res){
       var ip = req.headers['x-forwarded-for'] ||
           req.connection.remoteAddress ||
           req.socket.remoteAddress ||
           req.connection.socket.remoteAddress;
        res.send(ip);
});


app.get('/:shortId', function(req, res) {
	var shortId = req.params.shortId;
	utils.get(shortId, function(result) {
		res.redirect(result);
	});
});

app.listen(config.PORT);
