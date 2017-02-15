var nconf = require('nconf');

nconf.argv().env();

nconf.defaults({
  'MONGOLAB_URI': 'mongodb://heroku_app32308261:lg7149q2tg5slot9g8vpupllq5@ds029051.mongolab.com:29051/heroku_app32308261',
	'PORT': 53669,
	'GITHUB_CLIENT_ID': 'REPLACE_W_GITHUB_CLIENT_ID',
	'GITHUB_CLIENT_SECRET': 'REPLACE_W_GITHUB_CLIENT_SECRET',
	'GITHUB_CALLBACK': '/auth/github/callback',
});

module.exports = nconf;
