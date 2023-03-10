const {v4} = require("uuid");
const AWS = require("aws-sdk");

const addCancha = async(event) =>{

    const dynamodb = new AWS.DynamoDB.DocumentClient();

//const {nombre,direccion,comuna,nombreAdm,fono,nCanchas,tipoCanchas} = JSON.parse(event.body);
const data = JSON.parse(event.body);
const createAt1 = new Date();
 const   createAt = "Data: "+createAt1;




const id = v4();

const newCancha = {

    id,
    data,
    createAt

}

await dynamodb.put({
    TableName: "CanchaTable",
    Item: newCancha

}).promise()

console.log(createAt);

return {
    statusCode: 200,
    body: JSON.stringify(newCancha)
    
}   


};


module.exports = {

addCancha,

};