const {v4} = require("uuid");
const AWS = require("aws-sdk");

const addSubscription = async(event) =>{

    const dynamodb = new AWS.DynamoDB.DocumentClient();

//const {nombre,direccion,comuna,nombreAdm,fono,nCanchas,tipoCanchas} = JSON.parse(event.body);
const {email} = JSON.parse(event.body);
//const createAt1 = new Date();
 const   createAt = new Date().toISOString();;




const id = v4();

const newSubs = {

    id,
    email,
    createAt

}

await dynamodb.put({
    TableName: "SubscriptionTable",
    Item: newSubs

}).promise()

console.log(createAt);

return {
    statusCode: 200,
    body: JSON.stringify(newSubs)
    
}   


};


module.exports = {

addSubscription,

};