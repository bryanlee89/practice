const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = app => {
  app.post("/api/stripe", async (req, res) => {

  const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: req.body.id,
      description: "$5 for 5 credits"
    });

    console.log(charge);
  });
};

//
//
// var stripe = require("stripe")(
//   "sk_test_C0jV1e3K2wG0VUXWgJVX3EbI"
// );
//
// stripe.charges.create({
//   amount: 2000,
//   currency: "cad",
//   source: "tok_visa", // obtained with Stripe.js
//   description: "Charge for joshua.thompson@example.com"
// }, function(err, charge) {
//   // asynchronously called
// });
//
