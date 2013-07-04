module.exports.configs = {
	host : 'vanheemstrapictures.com', // put your host name here
	app_port : 3000, // put your port number here
	api_port : 3001, // put your port number here
	allow_cross_domain : true, // allow is true, otherwise false
	allowedHost : {
		'http://vanheemstrapictures.com': true,
		'localhost': true
	},
	title : 'Your Company', // put the page title here
	web_root : '/skin/public' // put your web root here, starting with a slash forward (/)
}