/**
 * Created by work on 10/13/17.
 */


var request = require('request');
var rp = require('request-promise');


/*var fs = require('fs'),
path = require('path'),
certFile = path.resolve(__dirname, 'ssl/admin.pem'),
keyFile = path.resolve(__dirname, 'ssl/admin-key.pem'),
caFile = path.resolve(__dirname, 'ssl/ca.pem');

var requestOptions = {
    cert: fs.readFileSync(certFile),
    key: fs.readFileSync(keyFile),
    ca: fs.readFileSync(caFile),
    json: true
};*/

/*
var kubeViewData = {
    scheduleData: [],
    NonScheduleData: []
}
*/

var dataObject = [{"name": "test",
    "namespace": "default",
    "RepclicaCount": 0,
    "ReadyReplicaCount": 0,
    "status": "normal"}];


module.exports = function(app, express, io){

    var i = 0;
    setInterval(function() {

        object = [{
            "name": "test",
            "namespace": "default",
            "RepclicaCount": i,
            "ReadyReplicaCount": 0,
            "status": "normal"
        },
            {"name": "core",
                "namespace": "default",
                "RepclicaCount": i,
                "ReadyReplicaCount": 0,
                "status": "danger"
            },
            {"name": "stream",
                "namespace": "default",
                "RepclicaCount": i,
                "ReadyReplicaCount": 0,
                "status": "normal"}];

        i++;
        dataObject = object;
        io.emit('data',object);

    },5000);

    var apiRoute = express.Router();


    apiRoute.route('/me')
        .get(function (req, res) {
            res.json(dataObject);
        });

    return apiRoute;


};