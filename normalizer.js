var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const parseNumber = require('libphonenumber-js');

var app = express();
var jsonParser = bodyParser.json();
 
app.post('/normalizer', jsonParser, function (req, res) {
    console.log(req.body);
    const { countryCode, number } = req.body;
    let data = [];
    try {
        for (let i = 0; i < countryCode.length; i++) { 
            const phoneNo = parseNumber.parsePhoneNumberFromString(number[i], countryCode[i]);
            if (phoneNo && phoneNo.isValid()) {
                data.push(phoneNo.number);
            }
            else {
                data.push('Invalid phone number');
            }
        }  
    }
    catch(e) {console.log(e)};
    res.send(data);
})
 
app.listen(3000);
