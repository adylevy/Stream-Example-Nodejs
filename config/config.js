var nconf = require('nconf');

nconf.argv().env();

nconf.defaults({
  'MONGOLAB_URI': 'mongodb://heroku_sbj5wl8m:heroku_sbj5wl8m@ds153669.mlab.com:53669/heroku_sbj5wl8m',
	'PORT': 53669,
	'GITHUB_CLIENT_ID': 'REPLACE_W_GITHUB_CLIENT_ID',
	'GITHUB_CLIENT_SECRET': 'REPLACE_W_GITHUB_CLIENT_SECRET',
	'GITHUB_CALLBACK': '/auth/github/callback',
});

module.exports = nconf;
