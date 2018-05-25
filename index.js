// content of index.js

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/client'));
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
}); 

app.post('/buttonPressed', function(req, res) {
    console.log(req.body);
    var returnObj = {};
    // if (req.body) {
    //     var submission = req.body.submission;
    //     var twillioString = "Acronym Requested!\rAcro: " + submission.Acronym + "\rDef: " + submission.Definition + "\rCont: " + submission.Context + "\r Email: " + submission.Email;
    //     twilioReport(twillioString);
    //     returnObj.message = "Message Sent!";
    //     res.send(returnObj);
    // }
    // else {
    //     res.sendStatus(400);
    // }
    res.end();
});