const express = require('express');
const bodyParser = require('body-parser');
let app = express();
// const Transaction   = require('./Model/Transaction');
// const Card          = require('./Model/Card');

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    // Log the request body
    console.log('====================================');
    console.log(req.body);
    console.log('====================================');

    if (req.body.type == "authorization.request") {
        const amount = req.body.data.object.amount; // Transaction amount
        const channel = req.body.data.object.transactionMetadata.channel; // Transaction Channel
        const balance = 1000; // Card balance, assuming you store that on your end

        // Check if card balance is sufficient
        if (balance >= amount) {
            /* 
             *   Record the transaction
             *   Update the Card Balance
             *   and Send response approval response
             */
            // Transaction Approved Response
            res.json({
                "statusCode": 200,
                "responseCode": "00",
            })
        } else {
            res.json({
                "statusCode": 400,
                "responseCode": "51", // Insufficient fund
            })

            // Other responseCode is 62; Means card is restricted
        }
    }
});
app.listen(process.env.PORT || 3000);