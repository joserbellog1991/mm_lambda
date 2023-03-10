
const AWS = require("aws-sdk");
const bcryptjs = require("bcryptjs");

module.exports.loginUsuario = async(event) =>{

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    //const {email} = event.pathParameters;
    const {email,pass} = JSON.parse(event.body);

    //let encript ="$2a$08$GcezH9n/YqAxmKAAGqsvNeWMVUmUY1kCG4xdED45UqPv5Gyv4sv4q";
   

    var params = {
        TableName: 'UsuarioTable',
        FilterExpression: 'email = :i',
        ProjectionExpression: 'id, email,pass,datos',
        ExpressionAttributeValues: {
          ':i': email    
        },
        
      };

const result = await dynamodb.scan(params).promise()

const count = result.Count;
const resultado = result.Items;
var dat = "";

if(count>0)
{

    const encript = resultado[0].pass;

    let compare =  bcryptjs.compareSync(pass,encript);
    if(compare){

        
       
        let id = resultado[0].id;
        let rut = resultado[0].datos.rut;
        let tipoJugador = resultado[0].datos.tipoJugador;
        let apellido = resultado[0].datos.apellido;
        let numFavorito = resultado[0].datos.numFavorito;
        let fono = resultado[0].datos.fono;
        let nombreUsuario = resultado[0].datos.nombreUsuario;
        let nombre = resultado[0].datos.nombre;
        let posicionFavorita = resultado[0].datos.posicionFavorita;
        let email = resultado[0].datos.email;
        let nacimiento = resultado[0].datos.nacimiento;
        let radio = resultado[0].datos.radio;
        let tickets = resultado[0].datos.tickets;
        radio = radio*1000;
        radio = radio+""
        let Islogin = true;

       var dat = {
            id,
            rut,
            apellido,
            numFavorito,
            fono,
            nombreUsuario,
            nombre,
            posicionFavorita,
            email,
            nacimiento,
            radio,
            Islogin,
            tipoJugador,
            tickets

       }
       var status = 0;
        var message="Login Success";
    }else{
        var status = 1;
        var message=" error: no coincide las contraseña";
                            
    
    }



}else{
    var status = 2;
    var message="No existe usuario en la base de datos";

}







//console.log(arbitros);

return {
    status: 200,
    headers: {
        "Access-Control-Allow-Headers" : "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Accept": "*/*",
        "Content-Type":"application/json"
    },
    body:{message,status,dat} 
}


};