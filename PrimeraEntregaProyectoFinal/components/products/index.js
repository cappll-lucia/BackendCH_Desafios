
let {Router, request, response} = require('express');
let  routerProds = new Router();

let Controller = require('./controllers/controller');
let ControllerProds = new Controller('./data/products.txt');


module.exports=(app)=>{

    app.use('/api/productos', routerProds);

    routerProds.get('/', async(request, repsonse)=>{
        let productsList = await ControllerProds.getAll();
        response.json(productsList);
    })

    routerProds.get('/:id', async(request, response)=>{
        let id = request.params.id;
        let prod = await ControllerProds.getByID(Number(id));
        console.log(prod);
        if(prod){
            response.send(prod);
        }
        else{
            response.sendStatus(400);
        }
    })

    routerProds.post('/', async(request, response)=>{
        let prod = request.body;
        if(prod){
            let newProduct = await ControllerProds.save(prod);
            console.log(`Producto registrado exitosamente con id: ${newProduct.id}`);
            repsonse.redirect('/');
        }else{
            response.sendStatus(400);
        }
    })

    routerProds.put('/:id', async(request, response)=>{
        let id = request.params.id;
        let prodChanges = request.body;
        let rta = await ControllerProds.updateById(id, prodChanges);
        if(rta){
            response.send(`Actualizaciones registradas exitosamente`);
        }
        else{
            response.sendStatus(400);
        }
    })

    routerProds.delete("/:id", async(request, response)=>{
        let id = request.params.id;
        let result = await ControllerProds.deleteByID(parseInt(id));
        response.send(result);
    })

}