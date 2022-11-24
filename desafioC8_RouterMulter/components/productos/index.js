

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
        let result = products.save(req.body)
        if(result.length > 0){
            res.send(`
            El producto : ${JSON.stringify(result[1])}\n\n
            reemplazado por : ${JSON.stringify(result[0])}
            en el posicion : ${result[0].id}
            `)
        }
        else{
            res.sendStatus(400)
        }
    })

}