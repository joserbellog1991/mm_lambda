
const AWS = require("aws-sdk");

module.exports.getCanchas = async(event) =>{

    const dynamodb = new AWS.DynamoDB.DocumentClient();

const result = await dynamodb.scan({
    TableName: "CanchaTable"
  

}).promise()

const canchas = result.Items;



return {
    status: 200,
    body: canchas
}


};


