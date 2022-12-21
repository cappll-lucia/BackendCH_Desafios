
let {Router} = require('express');
let routerCart = new Router();

let Controller = require('./controllers/controller');
let ControllerCart = new Controller('./data/carts.txt');

module.exports=(app)=>{

    app.use('/api/carrito', routerCart);

    routerCart.get('/', (request, response)=>{
        response.send('ok desde api carrito');
    })


    routerCart.get('/:id/productos', async (request, response)=>{
        let idCart = request.params.id;
        let cart = await ControllerCart.getByID(parseInt(idCart));
        response.json(cart.products);
    })

    routerCart.post('/', async (request, response)=>{
        let newCart = {
            "timeStamp": Date.now(),
            "products": []
        };
        newCart = await ControllerCart.save(newCart);
        response.send(`Carrito guardado con id=${newCart.id}`);
    })

    routerCart.delete('/:id', async (request, response)=>{
        let idCart = request.params.id;
        let rta = await ControllerCart.deleteByID(ParseInt(idCart));
        response.json({
            "result" : rta
        });
    })

    routerCart.post(':id/productos', async (request, response)=>{
        let idCart = request.params.id;
        let prodsToAdd = request.body;
        let rta = await ControllerCart.addProdutctsToCart(Number(idCart), prodsToAdd);
        response.json({
            "result" : rta
        });
    })

    routerCart.delete('/:id/productos/:id_prod', async(request,response)=>{
        let idCart = request.params.id;
        let idProd = request.params.id_prod;
        let rta = await ControllerCart.deleteProdFromCart(Number(idCart), Number(idProd));
        response.json({
            "result" : rta
        });
    })
}