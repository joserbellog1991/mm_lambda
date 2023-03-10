const {v4} = require("uuid");
const AWS = require("aws-sdk");

const addTienda = async(event) =>{

    const dynamodb = new AWS.DynamoDB.DocumentClient();

const {descripcion,precio,categoria } = JSON.parse(event.body);

 const   createAt = new Date().toISOString();;

const id = v4();

const newArbitro = {
   id, 
   descripcion,
   precio,
   categoria,
    createAt

}

await dynamodb.put({
    TableName: "TiendaTable",
    Item: newArbitro

}).promise()

return {
    statusCode: 200,
    body: JSON.stringify(newArbitro)
}


};


module.exports = {

addTienda,

};