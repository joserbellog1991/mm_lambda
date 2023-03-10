const {v4} = require("uuid");
const AWS = require("aws-sdk");
const bcryptjs = require("bcryptjs");

const addUsuario = async(event) =>{

    const dynamodb = new AWS.DynamoDB.DocumentClient();

//const {nombre,direccion,comuna,nombreAdm,fono,nCanchas,tipoCanchas} = JSON.parse(event.body);
const datos = JSON.parse(event.body);
const createAt1 = new Date();
 const   createAt = "Data: "+createAt1;
 let pass = await bcryptjs.hashSync(datos.pw,8);
 let email = datos.email;
 let nombreUsuario = datos.nombreUsuario;

const id = v4();


async function  searchData(table,camp,value)
{

    var params = {
        TableName: table,
        FilterExpression: camp+' = :i',
        ProjectionExpression: camp,
        ExpressionAttributeValues: {
          ':i': value    
        },

        
        
      };


      const result = await dynamodb.scan(params).promise()

const count = result.Count;

return count;

}

let count_email = await searchData("UsuarioTable","email",email);

let count_nombreUsuario = await searchData("UsuarioTable","nombreUsuario",nombreUsuario);

if(count_email>0 || count_nombreUsuario>0)
{

    var st = "1";
    var message = "Email o Nombre de usuario existe en la base de datos";

}else{

    const newUsuario = {

        id,
        email,
        datos,
        createAt,
        pass
    
    
    }
    
    await dynamodb.put({
        TableName: "UsuarioTable",
        Item: newUsuario
    
    }).promise()
    
    console.log(createAt);
    //datos = JSON.stringify(newUsuario);

    var st = "0";
    var message = "Usuario ingresado satisfactoriamente";
}


return {
    status: 200,
    body:{message,st} 

    
}   


};


module.exports = {

addUsuario,

};