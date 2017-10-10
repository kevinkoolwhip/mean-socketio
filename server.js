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
		url: 'https://35.196.185.104/apis/extensions/v1beta1/namespaces/default/deployments',
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImRlZmF1bHQtdG9rZW4tMGdtMWgiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGVmYXVsdCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImMzYjk1Zjg0LTllZTAtMTFlNy05MGZiLTQyMDEwYThlMGZlNyIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OmRlZmF1bHQifQ.GTDTRuul_9YGVVs5ss9ZAMJaGT2_2ulwypuSNUfXQLNr5xJSytwlm2qbPi6j54m5Yk29scMoGXtWJqjEQDMl3bWoddkrw3PIKi-3IiQ8aqHb3Cu-1ztUzk3M9fDj8_Jibzn8uDr80D1hAG7tytWbsPEqu5x9bJtbzgmjhMMYpKZyxTS_tnQTYWiVtxZ8vVXiTAvsqO-RSNoflNODICJTBoXTuY8nFdF4DVR4dw3n3WyAxIJnCzftLJ5nUJeC7cykRpXnR3eQ9KcJ3HxOkMhgW3rWI0Pz6tsdFCMZXGfbclhNR1QjvSihhtbjBLe_b1194KTxSL7DlvMWc7tccH4oMQ',
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
