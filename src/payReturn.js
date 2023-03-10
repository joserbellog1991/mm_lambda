
const AWS = require("aws-sdk");

const fetch = require("node-fetch");

const payReturn = async(event) =>{

    const {id} = event.pathParameters;

    const int_id = parseInt(id, 10);

const dynamodb = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: 'PaykuTable',
    FilterExpression: 'ord = :i',
    ProjectionExpression: 'id, createAt1,ord',
    ExpressionAttributeValues: {
      ':i': int_id 
    },
    
  };

const result = await dynamodb.scan(params).promise()

const id_txt = result.Items[0].id;

const res = await fetch('https://des.payku.cl/api/transaction/'+id_txt, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer tkpu8589372460a1a7e860c33881a91e'
    },
  });
  const payku = await res.json();


//console.log(result);

const response = {
    status: 200,
    body: {result,
        payku}
};
return response;

}


 
module.exports = {

    payReturn,
    
    };