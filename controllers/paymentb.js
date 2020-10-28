var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "zj6j2k7q4b3x2v9p",
  publicKey: "9wdmqfnrc5c8r924",
  privateKey: "587aeec71fa405228f90ca547e8cc6cd"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if(err) {
            res.status(500).send (err)
        } else {
            res.send(response)
        }
      });
      
}

exports.processpayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient  = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
        if(err) {
            res.status(500).json(err)
        } else {
            res.json(result)
        }
      });
}