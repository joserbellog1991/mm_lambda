"use strict";
const AWS = require("aws-sdk");

module.exports.hello = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

const result = await dynamodb.scan({
    TableName: "ArbitroTable"
  

}).promise()

const arbitros = result.Items;

console.log(arbitros);

return {
    status: 200,
    body: arbitros
}
};
