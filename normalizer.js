var express = require('express');
var app = express();
const parsePhoneNumberFromString = require('libphonenumber-js');
 
app.get('/normalizer', function (req, res) {
    const { countryCode, number } = req;
    let data = [];
    for (let i = 0; i < countryCode.length; i++) { 
        const phoneNo = parsePhoneNumberFromString(number[i], countryCode[i]);
        if (phoneNo && phoneNo.isValid()) {
            res.push(phoneNo);
        }
        else {
            data.push('Invalid phone number');
        }
    }
    res.end(data);
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("Example app listening at http://%s:%s", host, port)
 
})
