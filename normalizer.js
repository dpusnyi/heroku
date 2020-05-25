var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const parseNumber = require('libphonenumber-js');
const port = process.env.PORT;

var app = express();
var jsonParser = bodyParser.json();
 
app.post('/normalizer', jsonParser, function (req, res) {
    const data = req.body;
    try {
        for (let i = 0; i < data.length; i++) {
            if (!data[i].telephone || !data[i].countryCode) { data[i].normalised = "Invalid Phone" }
            else {
                data[i].normalised = data[i].telephone.replace(/[^0-9]/gim,'');
                const number = parseNumber.parsePhoneNumberFromString(data[i].normalised, data[i].countryCode);
                if (number && number.isValid()) { data[i].normalised = number.number; }
                else { data[i].normalised = "Invalid Phone" };
            }
        }
        console.log(data);
    }
    catch(e) {console.log(e)};
    res.send(JSON.stringify(data));
})
 
app.listen(port, function() {
    console.log(port);
});
