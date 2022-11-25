

let {Router, request, response} = require('express');
let routerProds = new Router();

let Controller = require('./controllers/Controller');
let controllerProds = new Controller('./data/products.txt');

module.exports=(app)=>{


    app.use("/api/productos", routerProds);

    routerProds.get("/", async (request, response, next)=>{
        let productsList = await controllerProds.getAll();
        response.send(productsList);
    })

    routerProds.get("/:id", async(request, response, next)=>{
        let id = request.params.id;
        let prod = await controllerProds.getByID(Number(id));
        response.send(prod);
    })


    routerProds.post("/", async(request, response, next)=>{
        let prod = request.body;
        if (prod){
            let newProd = await controllerProds.save(prod);
            response.json({newProd}); 
        }
        else{
            response.sendStatus(400);
        }
    })


    routerProds.delete("/:id", async(request, response, next)=>{
        let id = request.params.id;
        let result = await controllerProds.deleteByID(parseInt(id));
        response.send(result);
    })

    routerProds.put("/:id", async(request, response, next)=>{
        let id=request.params.id;
        let prod = request.body;
        let rta = await controllerProds.updateByID(id, prod);
        if(rta){
            response.send({rta})
        }
        else{
            response.sendStatus(400);
        }
    })
}