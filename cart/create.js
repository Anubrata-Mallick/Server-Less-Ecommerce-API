// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {verifyToken} =require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);

  if(tokenUser != null ){
    const {products} = params;

    //validation
    if(!products){
      context.status(400);
      return{
        "message":"Please enter products"
      }
    }

    const cartTable = aircode.db.table('cart');
  
    try{
      const bucket = {
        ...params,
        "userId": tokenUser._id
      }
      const result = await cartTable.save(bucket);
      context.status(201);
      return{
        result
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

