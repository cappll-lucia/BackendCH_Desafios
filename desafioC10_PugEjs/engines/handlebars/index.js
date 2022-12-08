

const { request, response } = require('express');
let express = require('express');
let app = express();
const PORT= 3030;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let hbs= require('express-handlebars');
app.engine('handlebars', hbs.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');
app.use(express.static('public'))


let Controller = require('../../components/controller');
let controllerProds = new Controller('../../data/products.txt');


app.get('/', (request, response, next)=>{
    response.render('formulario', {});
})

app.get('/productos', async(request, response, next)=>{
    let products = await controllerProds.getAll();
    response.render('products', {products});
})

app.post('/productos', async(request, response, next)=>{
    let prod = request.body;
    if(prod){
        await controllerProds.save(prod);
        console.log(`Registrado con éxito`);
        response.redirect('/');
    }
})


app.listen(PORT, ()=>{console.log(`server running at http://localhost:${PORT}`)});

