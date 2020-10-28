var express = require("express");
var router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth") 

const { getToken, processpayment } = require("../controllers/paymentb")

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken)

router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated, processpayment)


module.exports = router;