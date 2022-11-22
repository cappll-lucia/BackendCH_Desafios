

const e = require('express');
let express = require('express');
const PORT = 8081;
let app = express();

let Contenedor = require('./contenedor');

const products = new Contenedor("./products.txt");
const server = app.listen(PORT, ()=>{ console.log(`server on: http://localhost/${PORT}/`)});


app.get("/productos", async (request, response, next)=>{
    const productsList = products.getAll();
    response.send(productsList);
});

app.get("/productoRandom", (request, response, next)=>{

});

server.on('error', error=>{
    console.log(`Error en el servidor: ${error}`);
})

