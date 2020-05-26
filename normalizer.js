var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const parseNumber = require('libphonenumber-js');
const accountSid = 'AC8cb8e1d5b9cbe3cb3c48fe2ab8803597';
const authToken = '6fffebd4e1b8e2abf4ee020fd46ca08c';
const client = require('twilio')(accountSid, authToken);
const port = process.env.PORT;

var app = express();
var jsonParser = bodyParser.json();
 
app.post('/normalizer', jsonParser, async function (req, res) {
    const data = req.body;
    try {
        for (let i = 0; i < data.length; i++) {
            if (!data[i].telephone || !data[i].countryCode) { data[i].normalised = "Invalid Phone" }
            else {
                data[i].carrier = "";
                data[i].normalised = data[i].telephone.replace(/[^0-9]/gim,'');
                const number = parseNumber.parsePhoneNumberFromString(data[i].normalised, data[i].countryCode);
                if (number && number.isValid()) {
                    data[i].normalised = number.number;
                    await client.lookups.phoneNumbers(data[i].normalised)
                        .fetch({type: ['carrier']})
                        .then(phone_number => { if (phone_number.carrier.type === "mobile" && phone_number.carrier.name) data[i].carrier = "Type: " + phone_number.carrier.type + ", Carrier: " + phone_number.carrier.name;});
                }
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
