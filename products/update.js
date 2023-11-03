// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {verifyToken} =require('../helper/verifyToken');

module.exports = async function (params, context) {
  // verify if it is loggedin user or not 
  const tokenUser = await verifyToken(context);

  
  if(tokenUser != null && tokenUser.isAdmin){ 
    
    const {_id, title, description, inStock, category, price, color, size} = params;
    
    const productTable = aircode.db.table('product');
    const product = await productTable
      .where({_id})
      .findOne();
    
    product.title = title;
    product.description = description;
    product.inStock = inStock;
    product.category = category;
    product.price = price;
    product.color = color;
    product.size = size;
    
    try{
      await productTable.save(product);
      context.status(204);
      return {
        ...product
      };
    }catch(err){
      context.status(500);
      return {
        "message":err.message
      }
    }
    
  }
  else{
    context.status(401);
    return{
      "message":"Token is not valid or User is not Authorized"
    }
  }
};


