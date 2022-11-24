

let {Router} = require('express');
let routerProds = new Router();

let Controller = require('./controllers/Controller');
let controllerProds = new Controller('./components/products/data/products.txt');

module.exports=(app)=>{


    app.use("/api/productos", routerProds);

    routerProds.get("/", (request, response, next)=>{
        let productsList = controllerProds.getAll();
        console.log(productsList);
        response.send(productsList);
    })


}