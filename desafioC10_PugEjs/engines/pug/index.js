

const { request, response } = require('express');
let express = require('express');
let app = express();
const PORT= 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', './views/layout');
app.set('view engine', 'pug');
app.use(express.static('public'))


let Controller = require('../../components/controller');
let controllerProds = new Controller('../../data/products.txt');


app.get('/', (request, response, next)=>{
    response.render('formulario.pug', {});
})

app.get('/productos', async(request, response, next)=>{
    let products = await controllerProds.getAll();
    response.render('products.pug', {products});
})

app.post('/productos', async(request, response, next)=>{
    let prod = request.body;
    if(prod){
        await controllerProds.save(prod);
        console.log(`Registrado con éxito`);
        response.redirect('/');
    }
    else{
        response.sendStatus(400);
    }
})


app.listen(PORT, ()=>{console.log(`server running at http://localhost:${PORT}`)});

