var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const parseNumber = require('libphonenumber-js');
const port = process.env.PORT;

var app = express();
var jsonParser = bodyParser.json();
 
app.post('/normalizer', jsonParser, function (req, res) {
    console.log(req.body);
    const data = req.body;
    let result = [];
    try {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            let obj = {};
            if (!data[i].telephone || !data[i].countryCode) { obj.phone = "Invalid Phone" }
            else {data[i].telephone = data[i].telephone.replace(/[^0-9]/gim,'')}
            const number = parseNumber.parsePhoneNumberFromString(data[i].telephone, data[i].countryCode);
            if (number && number.isValid()) { obj.phone = number.number; }
            else { obj.phone = "Invalid Phone" };
            result.push(obj);
        }
        console.log(result);
    }
    catch(e) {console.log(e)};
    res.send(JSON.stringify(result));
})
 
app.listen(port, function() {
    console.log(port);
});
