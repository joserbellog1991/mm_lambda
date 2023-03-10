
const AWS = require("aws-sdk");

module.exports.getTienda = async(event) =>{

    const dynamodb = new AWS.DynamoDB.DocumentClient();

const result = await dynamodb.scan({
    TableName: "TiendaTable"
  

}).promise()

const arbitros = result.Items;

console.log(arbitros);

let msj  = [];

const count = arbitros.length;



for(let i=0;i<count;i++)
{
    msj[i] = {
       
        
        createAt:arbitros[i].createAt,
        data:{
            id:arbitros[i].id,
            descripcion: arbitros[i].descripcion,
            precio: arbitros[i].precio,
            categoria: arbitros[i].categoria,
            cant: arbitros[i].cant
        }
       

    }
}


return {
    status: 200,
    body: msj
}


};


