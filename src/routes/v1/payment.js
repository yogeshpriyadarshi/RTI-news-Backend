const express = require("express");
const { razorpay } = require("../../config/razorpay");

const Router = express.Router();

// This API is used for creating Order id
Router.post("/create-order", async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  try {
    const options = {
      amount: amount * 100,      // Razorpay uses paise
      currency,
      receipt,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Order creation failed", err });
  }
});

// This API is used for verifing the payment.
Router.post("/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true, message: "Payment verified" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});


module.exports= Router;