module.exports.configs = {
	host : 'localhost', // put your host name here
	server_port : 10080, // put your server port number here
	app_port : 3000, // put your port number here
	app_gid : 'root', // put your group id here
	app_uid : 'root', // put your user id here
	api_port : 3001, // put your port number here
	api_gid : 'root', // put your group id here
	api_uid : 'root', // put your user id here	
	allow_cross_domain : true, // allow is true, otherwise false
	allowedHost : {
		'http://vanheemstrapictures.com': true,
		'localhost': true
	},
	title : 'van Heemstra Pictures', // put the page title here
	web_root : '/skin/public' // put your web root here, starting with a slash forward (/)
}