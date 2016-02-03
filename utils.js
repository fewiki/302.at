var shorturl = require('short-url-generator');
var AV = require('avoscloud-sdk');
var config = require('./config');

AV.initialize(config.APP_ID, config.APP_KEY);

var Url = AV.Object.extend('Url', {
	longUrl: function() {
		return this.get('longUrl');
	},
	shortId: function() {
		return this.get('shortId');
	}
}, {
	spawn: function(longUrl, shortId) {
		var url = new Url();
		url.set('longUrl', longUrl);
		url.set('shortId', shortId);
		return url;
	}
}), query = new AV.Query(Url);

module.exports = {
    set: function(longUrl, callback) {
    	var shortUrl = shorturl(longUrl);
    	if (shortUrl.is_url) {
    		Url.spawn(longUrl, shortUrl.short).save().then(function() {
    			callback(shortUrl);
    		}, function(err) {
    			callback(err);
    		});
    	} else {
    		callback(shortUrl);
    	}
    },
    get: function(shortId, callback) {
    	query.equalTo('shortId', shortId);
    	query.first().then(function(result) {
    		if (result && result.longUrl()) {
    			callback(result.longUrl());
    		} else {
    			callback('/404');
    		}
    	}, function(err) {
    		callback('/404');
    	});
    }
};
