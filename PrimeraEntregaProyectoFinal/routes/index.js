
let apiProductos = require('../components/products/index');
let apiCarritos = require('../components/cart/index');


module.exports=(app)=>{
    
    app.get('/', (request, response)=>{
        response.send('ok');
    })

    apiProductos(app);
    apiCarritos(app);
}