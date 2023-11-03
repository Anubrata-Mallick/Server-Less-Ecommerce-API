// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const stripe = require('stripe')(process.env.STRIPE_KEY)
const {verifyToken} =require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);

  if(tokenUser != null){
    const {amount, currency, paymentMethod} = params;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: [paymentMethod]
    });

    console.log("payment intent ", paymentIntent)
    
    const {client_secret} = paymentIntent;
    context.status(200);
    return{
      client_secret
    }
  }else{
    context.status(400)
    return{
      "message":"User not authorized"
    }
  }
};
