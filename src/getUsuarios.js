
const AWS = require("aws-sdk");

module.exports.getUsuarios = async(event) =>{

    const dynamodb = new AWS.DynamoDB.DocumentClient();

const result = await dynamodb.scan({
    TableName: "UsuarioTable"
  

}).promise()

const usuarios = result.Items;

console.log(usuarios);

return {
    status: 200,
    body: usuarios
}


};


