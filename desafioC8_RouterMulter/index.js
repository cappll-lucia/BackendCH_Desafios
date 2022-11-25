
let express = require('express');
let app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('html'));


let serverRoutes = require('./routes');

serverRoutes(app);


app.listen(PORT, ()=>{console.log(`server running at http://localhost:${PORT}`)});
