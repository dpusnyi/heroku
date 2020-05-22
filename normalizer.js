var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const parseNumber = require('libphonenumber-js');
const port = process.env.PORT;

var app = express();
var jsonParser = bodyParser.json();
 
app.post('/normalizer', jsonParser, function (req, res) {
    console.log(req);
    const data = req.body;
    let result = { phone: [] };
    try {
        result = data.map(el => {

            const phoneNo = parseNumber.parsePhoneNumberFromString(toString(el.telephone), toString(el.countryCode));
            if (phoneNo && phoneNo.isValid()) {
                data.push(phoneNo.number);
            }
            else {
                data.push('Invalid phone number');
            }
        })
    }
    catch(e) {console.log(e)};
    res.send(result);
})
 
app.listen(port, function() {
    console.log(port);
});
