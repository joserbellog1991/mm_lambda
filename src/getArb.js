
const AWS = require("aws-sdk");

module.exports.getAr = async(event) =>{

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters;

const result = await dynamodb.get({
    TableName: "ArbitroTable",
    Key: {
        id
    }
  

}).promise()

const arbitro = result.Item;

//console.log(arbitros);

return {
    status: 200,
    body: arbitro
}


};


