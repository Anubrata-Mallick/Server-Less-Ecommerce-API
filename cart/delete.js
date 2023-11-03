// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {verifyToken} =require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);

  if(tokenUser != null ){

    const {_id} = params;
    const cartTable = aircode.db.table('cart');

    const bucket = await cartTable
      .where({"_id": _id})
      .findOne();
  
    if (bucket != null){
      await cartTable.delete(bucket);
      context.status(201);
      return{
        "id": _id,
        "message": "bucket deleted"
      }
    }else{
      context.status(201);
      return{
        "id": _id,
        "message": "bucket not found"
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
