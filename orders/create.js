// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {verifyToken} =require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);

  if(tokenUser != null ){
    const {products, amount, address, status} = params;

    //validation
    if(!products || !amount || !address){
      context.status(400);
      return{
        "message":"Please enter products amount and address"
      }
    }

    const orderTable = aircode.db.table('order');
  
    try{
      const order = {
        ...params,
        "userId": tokenUser._id
      }
      const result = await orderTable.save(order);
      context.status(201);
      return{
        order
      }
    }
    catch(err){
      context.status(402);
      return{
        "message":err.message
      }
    }
  }
  else{
    context.status(401)
    return{
      "message":"User is not authorized"
    }
  }
};
