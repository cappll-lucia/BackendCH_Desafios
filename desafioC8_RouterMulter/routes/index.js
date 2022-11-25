
let apiProductos = require('../components/productos/index')



module.exports=(app)=>{
    
    app.get("/", (request, response, next)=>{
        response.send("ok");
    })

    apiProductos(app);
}