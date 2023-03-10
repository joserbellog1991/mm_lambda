 
const AWS = require("aws-sdk");

const axios = require("axios");

const fetch = require("node-fetch");


     const getPayku = async(event) =>{
        const res = await fetch('https://des.payku.cl/api/transaction?date_init=2023-01-13&date_end=2023-01-18', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer tkpu8589372460a1a7e860c33881a91e'
            },
          });
         
          const result = await res.json();
          console.log(result);
          
          const response = {
              status: 200,
              body: result,
          };
          return response;

  



 
 
 
 };
 

 
module.exports = {

    getPayku,
    
    };

   