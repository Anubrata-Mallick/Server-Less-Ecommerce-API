// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const bcrypt = require('bcrypt');

module.exports = async function (params, context) {
  console.log('Received params:', params); // this will print the body
  console.log('Recived context:', context); // this will print the heades

  //** TAKE ALL THE FIELD AND STORE IT IN DB **//
  const {name, email, password} = params
  if(!name || !email || !password){ // if some fields are missing
     context.status(400)
    return {
      "message": " All fields are required "
    };
  }

  const userTable = aircode.db.table('user') //creating db 
  const userExist = await userTable // find one instance of email(pk)
    .where({email})
    .findOne()

  if(userExist){
    context.status(409)
    return{
      "message":"User already exist"
    }
  }

  //if user does not exist then add user to database || first user is admin
  try{
    const userCount = await userTable.where().count()

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {name, email, "password": hashedPassword, "isAdmin":false}

    if(userCount == 0){
      newUser.isAdmin = true
    }
    await userTable.save(newUser)
  }catch(err){
    return {
      "message":err.message
    }
  }


const result = await userTable
  .where({email})
  .projection({password:0, isAdmin:0})
  .find()

context.status(201)
return{
  ...result
}

  
};
