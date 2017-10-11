//server.js

//==================================--BASE SETUP--============================
//LOAD PACKAGES-------------------------------
var express = require ('express'); //EXPRESS Package
var app = express();	//define our app using express
var bodyParser = require('body-parser');// get body-parser
var morgan = require('morgan'); //use to see requests
var path = require('path');
var request = require('request');
var server = require('http').Server(app);
var io = require('socket.io')(server);


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


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


var i = 0;

setInterval(function() {
	/*var options = {
		rejectUnauthorized: false,
		url: 'https://test/apis/extensions/v1beta1/namespaces/default/deployments',
		headers: {
			'Authorization': 'Bearer test',
			'Accept': 'application/json'
		}
	};

	request(options, function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			var res = JSON.parse(body);
			responseObject = []
			if(res["items"].length > 0) {
				list = res["items"]
				for (var i in list) {
					console.log(list[i])
					obj = {};
					obj["name"] = list[i]["metadata"]["name"];
					obj["namespace"] = list[i]["metadata"]["namespace"];
					obj["RepclicaCount"] = list[i]["spec"]["replicas"];
					obj["ReadyReplicaCount"] = list[i]["status"]["available_replicas"];
					responseObject.push(obj)
				}
				console.log(responseObject);
				io.emit('data', responseObject);
			}
		} else {
			console.log(error)
		}
	});*/

	object = [{
		"name": "test",
		"namespace": "default",
		"RepclicaCount": i,
		"ReadyReplicaCount": 0
	},
		{"name": "core",
		"namespace": "default",
		"RepclicaCount": i,
		"ReadyReplicaCount": 0
		},
		{"name": "strea",
			"namespace": "default",
			"RepclicaCount": i,
			"ReadyReplicaCount": 0}];

	i++;
	io.emit('data',object);
},5000);


//=========================--START THE SERVER---=========================
server.listen(8080);
console.log("Magic happens on port" + 8080);
