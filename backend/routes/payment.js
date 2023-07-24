// Author: Abhishek Bhatt
var express = require('express');
var router = express.Router();
const { sendNotification } = require("../conn");
const stripe = require("stripe")(process.env.SECRET_KEY);
const response = require('./response');

router.post("/", async (req, res) => {
  const { name, amount, packageName,userId } = req.body;
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
      success_url: "http://localhost:3001/",
      cancel_url: "http://localhost:3000/payment",
    });
    // const notificationPayload = {
    //   userId,
    //   title: 'Payment Successful',
    //   description: `Your payment for the ${packageName} has been processed successfully.`,
    //   payload: {
    //     type: 'payment',
    //     // modify this as needed
    //     url: session.url
    //   }
    // };

//sendNotification(notificationPayload);
res.send(response.sendSuccess(res, { link: session.url }));
  } catch (error) {
    console.log(error);
res.send(response.sendError(res, "Failed to create Stripe session", 500));
  }
});
module.exports = router;


