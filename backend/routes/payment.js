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
        //success_url: "http://localhost:3000/success",
        //cancel_url: "http://localhost:3000/cancel",
      });
      const notificationPayload = {
        userId,
        title: 'Payment Successful',
        description: `Your payment for the ${packageName} has been processed successfully.`,
        payload: {
          type: 'payment',
          // modify this as needed
          url: session.url 
        }
      };
      // make a POST request to the notifications API, change the API path for notification
    const notificationRes = await axios.post('http://localhost:3001/', notificationPayload);

    if (notificationRes.status !== 200) {
      throw new Error('Failed to create notification');
    }

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


