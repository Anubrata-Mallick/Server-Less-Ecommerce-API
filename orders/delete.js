// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {verifyToken} =require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);

  if(tokenUser != null ){
    const {_id} = params;

    //validation
    if(!_id){
      context.status(400);
      return{
        "message":"Please enter product id"
      }
    }

    const productTable = aircode.db.table('product');
    const product = await productTable
    .where({_id})
    .findOne()

  //save to db if not exist
    try{
      const result = await productTable.delete(product);
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
