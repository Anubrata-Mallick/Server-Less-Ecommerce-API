// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {verifyToken} =require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);

  if(tokenUser != null && tokenUser.isAdmin){

    const orderTable = aircode.db.table('order');
  
    try{
      const orders = await orderTable
      .where()
      .find()

      const count = await orderTable
      .where()
      .count()
      
      context.status(201);
      return{
        "count": count,
        "orders":orders
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
