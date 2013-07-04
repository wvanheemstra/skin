var express = require('express'),
    device  = require('../lib/device.js'),
    redirect = require('express-redirect');

config = require('../config/server.js');
var configs = config.configs;
    
var app = express();
if(typeof configs.app_port === 'undefined'){
	var app_port = process.env.PORT || 3000;
}
else {
	var app_port = configs.app_port;
}

var api = express();
if(typeof configs.api_port === 'undefined'){
	var api_port = app_port+1 || 3001;
}
else {
	var api_port = configs.api_port;
}

api.configure(function(){
	api.use(api.router);
});

api.all('*', function(req, res, next){
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000, http://vanheemstrapictures.com:3000'); // Accepts requests coming from app
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

api.post('/login', function(req, res){
  console.log(req.body);
  res.send(201);
});

app.configure(function(){
    app.set('view engine', 'ejs');
    app.set('view options', { layout: true });
    app.set('views', __dirname + '/../public');
    
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(device.capture());
    
    app.enableDeviceHelpers();
    app.enableViewRouting();

    app.use(app.router);
});

if(typeof configs.title === 'undefined'){
	var title = 'Untitled';
}
else {
	var title = configs.title;
}

if(typeof configs.web_root === 'undefined'){
	var web_root = '';
}
else {
	var web_root = configs.web_root;
}

if(typeof configs.host === 'undefined'){
	var host = req.host;
}
else {
	var host = configs.host;
}

// re-directing to directories
app.use(function(req, res, next) {
  // redirect all requests for resources directory in the web root to e.g. /skin/public/resources/
  if (req.url.substr(0,11) === '/resources/') {   
    console.log('Received a request for resources redirect: '+ req.url);    
    // 302 - Moved temporarily
    var new_location = req.protocol + "://" + req.host + web_root + req.url;
    console.log('New resources location: '+ new_location);
    res.redirect(302, new_location);
  }  
  // redirect all requests for app directory in the web root to e.g. /skin/public/app/ 
  else if(req.url.substr(0,5) === '/app/'){
    console.log('Received a request for app redirect: '+ req.url);
    // 302 - Moved temporarily
    var new_location = req.protocol + "://" + req.host + web_root + req.url;
    console.log('New app location: '+ new_location);
    res.redirect(302, new_location);  	
  }
  // redirect all requests for locale directory in the web root to e.g. /skin/public/locale/ 
  else if(req.url.substr(0,8) === '/locale/'){
    console.log('Received a request for locale redirect: '+ req.url);
    // 302 - Moved temporarily
    var new_location = req.protocol + "://" + req.host + web_root + req.url;
    console.log('New locale location: '+ new_location);
    res.redirect(302, new_location);  	
  }
  // redirect all requests for Deft directory in the web root to e.g. /skin/public/resources/js/deft/Deft/ 
  else if(req.url.substr(0,6) === '/Deft/'){
    console.log('Received a request for Deft redirect: '+ req.url);
    // 302 - Moved temporarily
    var new_location = req.protocol + "://" + req.host + web_root + '/resources/js/deft' + req.url;
    console.log('New Deft location: '+ new_location);
    res.redirect(302, new_location);  	
  }    
  // redirect all requests for a file in the web root to e.g. /skin/public/ 
  else if(req.url.substr(0,1) === '/'){
    console.log('Received a request for file redirect: '+ req.url);
    // 302 - Moved temporarily
    var new_location = req.protocol + "://" + req.host + web_root + req.url;
    console.log('New file location: '+ new_location);
    res.redirect(302, new_location);  	
  }  
  else {
    next();
  }
});

// routing to pages
app.get('/', function(req, res) {
    res.render('index', { title: title, host: host, web_root: web_root, layout: false });
});

app.get('/2', function(req, res) {
    res.render('index2', { title: 'Your Company with layout' });
});

app.get('/3', function(req, res) {
    res.render('index2', { title: 'Your Company with layout', layout: 'xpto' });
});

app.get('/4', function(req, res) {
    res.render('index2', { title: 'Your Company with layout', layout: 'etc/layout' });
});

app.get('/5', function(req, res) {
    res.render('index3', { title: 'Your Company with layout' });
});

app.listen(app_port);
api.listen(api_port);

console.log("Express app server listening on port %d in %s mode", app_port, app.settings.env);
console.log("Express api server listening on port %d in %s mode", api_port, api.settings.env);