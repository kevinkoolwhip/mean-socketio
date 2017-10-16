//server.js

//==================================--BASE SETUP--============================
//LOAD PACKAGES-------------------------------
var express = require ('express'); //EXPRESS Package
var app = express();	//define our app using express
var bodyParser = require('body-parser');// get body-parser
var morgan = require('morgan'); //use to see requests
var path = require('path');
var request = require('request');
var rp = require('request-promise');
var server = app.listen(8080);
var io = require('socket.io').listen(server);

/*
var fs = require('fs'),
	path = require('path'),
	certFile = path.resolve(__dirname, 'ssl/admin.pem'),
	keyFile = path.resolve(__dirname, 'ssl/admin-key.pem'),
	caFile = path.resolve(__dirname, 'ssl/ca.pem');

var requestOptions = {
	cert: fs.readFileSync(certFile),
	key: fs.readFileSync(keyFile),
	ca: fs.readFileSync(caFile),
	json: true
};

var kubeViewData = {
	scheduleData: [],
	NonScheduleData: []
}
*/

dataObject = [{
	"name": "test",
	"namespace": "default",
	"RepclicaCount": 0,
	"ReadyReplicaCount": 0
	}];

app.use(morgan('dev')); //HTTP logger

//==================================--APP--====================================

// APP CONFIGURATION------------------------------------------
// use body parser to grab information from POST
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Orgin','*');
	res.setHeader('Access-Control-Allow-Method','GET,POST');
	next();
});


// set static files location
// used for requests that frontend will make
app.use(express.static(__dirname + '/public'));

//=========================--ROUTES/API--====================================
var apiRoutes = require(__dirname + '/server/routes/api')(app,express,io);

app.use('/api',apiRoutes);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});



//=========================--START THE SERVER---=========================
//server.listen(8080);
console.log("Magic happens on port " + 8080);
