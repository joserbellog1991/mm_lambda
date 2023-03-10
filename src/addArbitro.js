const {v4} = require("uuid");
const AWS = require("aws-sdk");

const addArbitro = async(event) =>{

    const dynamodb = new AWS.DynamoDB.DocumentClient();

const {nombre,apellido, nacimiento,rut, ciudad, comuna, fono, email } = JSON.parse(event.body);
const createAt1 = new Date();
 const   createAt = "Data: "+createAt1;

const id = v4();

const newArbitro = {

    id,
    nombre,
    apellido,
    nacimiento,
    rut,
    ciudad,
    comuna,
    fono,
    email,
    createAt

}

await dynamodb.put({
    TableName: "ArbitroTable",
    Item: newArbitro

}).promise()

return {
    statusCode: 200,
    body: JSON.stringify(newArbitro)
}


};


module.exports = {

addArbitro,

};