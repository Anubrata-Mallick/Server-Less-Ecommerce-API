// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {verifyToken} =require('../helper/verifyToken');

module.exports = async function (params, context) {
  // verify if it is loggedin user or not 
  const tokenUser = await verifyToken(context);
  const { name } = params // get name to update
  
  if(tokenUser != null){ //extract the id from verified user then after getting user instance from userTable update name and save it 
    const {_id} = tokenUser;
    const userTable = aircode.db.table('user');
    
    const user = await userTable
      .where({_id})
      .projection({password:0, isAdmin:0, accessToken:0})
      .findOne();
    user.name = name;
    
    try{
      await userTable.save(user);
      context.status(204);
      return {
        ...user
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

