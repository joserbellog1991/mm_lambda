 
const AWS = require("aws-sdk");
const fetch = require("node-fetch");


     const addPayku = async(event) =>{
        const {ord, monto,idUser,cant,idTienda } = JSON.parse(event.body);
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const createAt1 = new Date().toISOString();
        
  
        let data = {
          email: "jose.bello@technoloty.com",
          order: ord,
          subject: "Transferencia desde api",
          amount: monto,
          payment: 1,
          expired: "2023-02-03 22:05:10",
          urlreturn: "https://74ffpfcww3.execute-api.sa-east-1.amazonaws.com/payReturn/"+ord,
          urlnotify: "https://usaservice7.cl/payku/urlnotify.php?orderClient="+ord,
          additional_parameters: {
            parameters1:"keyValue",
            parameters2:"keyValue2",
            order_ext:"fff-732477"
          }
        }
 
 
        const res = await fetch('https://des.payku.cl/api/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer tkpu8589372460a1a7e860c33881a91e'
      },
      body: JSON.stringify(data)
    });
          const result = await res.json();


        newPay = {
            id : result.id,
            idUser,
            ord,
            idTienda,
            monto,
            cant,
            createAt1

        }
          await dynamodb.put({
            TableName: "PaykuTable",
            Item: newPay
        
        }).promise()  

          console.log(result);
          
          const response = {
              status: 200,
              body: result,
          };
          return response;

  



 
 
 
 };
 

 
module.exports = {

    addPayku,
    
    };

  /*
  request(data);
  
  const request = async () => {
    const response = await fetch('https://des.payku.cl/api/transaction?date_init=2023-01-11&date_end=2023-01-12', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer tkpu8589372460a1a7e860c33881a91e'
      },
    });
    const result = await response.json();
    console.log(result)
  }
  
  request();*/