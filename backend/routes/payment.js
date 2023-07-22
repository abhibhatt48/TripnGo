 // Author: Abhishek Bhatt
 
 var express = require('express');
  var router = express.Router();
  const stripe = require("stripe")(process.env.SECRET_KEY);
  const response = require('./response');

  router.post("/", async (req, res) => {
    const { name, amount, packageName } = req.body;
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "cad",
              product_data: {
                name: packageName,
              },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        // TODO; Change this URL and nevigate to notification. 
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });
      return response.sendSuccess(res, { link: session.url });
    } catch(error) {
      return response.sendError(res, "Failed to create Stripe session", 500);
    }
  });

/* PUT contact us information */
router.put('/:id', function (req, res, next) {
  const id = req.params.id;
  res.send('respond with a resource ' + id);
});

/* GET contact us information */
router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  res.send('respond with a resource ' + id);
});

module.exports = router;


