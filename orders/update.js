// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {verifyToken} =require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);

  if(tokenUser != null ){
    const {_id, products, amount, address, status} = params;

    //validation
    if(!_id || !status){
      context.status(400);
      return{
        "message":"Please enter product _id"
      }
    }

    const orderTable = aircode.db.table('order');

    const order = await orderTable
    .where({_id})
    .findOne()

    if(!tokenUser.isAdmin && status != 'cancled'){
      context.status(400)
      return{
        "message":"order updation not allowed"
      }
    }else{
      order.products = products || order.products
      order.address = address || order.address
      order.amount = amount || order.amount
      order.status = status
    }
  
    try{
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
