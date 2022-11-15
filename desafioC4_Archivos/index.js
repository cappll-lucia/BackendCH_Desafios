
const { Console } = require("console");
const fs = require("fs");


class Contenedor{
    constructor(url){
        this.url = url;
    }


    async getAll(){
        try {
            let productsList = await fs.promises.readFile(this.url, "utf-8");
            return JSON.parse(productsList);
        } catch (error) {
            console.log("Error --> ", error);
            return [];
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.url, "");
            console.log("Elementos eliminados");
        } catch (error) {
            console.log("Error --> ", error);
        }
    }

    async getLastID(){
        const productsList = await this.getAll();
        return productsList.length;
    }

    async save(obj){
        try {
            const productsList = await this.getAll();
            obj.id = await this.getLastID()+1;
            productsList.push(obj);
            let productsListFile = JSON.stringify(productsList, null, 2);
            await fs.promises.writeFile(this.url, productsListFile);
            console.log("Objeto guardado.");
            return obj.id;
        } catch (error) {
            console.log("Error --> ", error);
        }
    }

    async getByID(id){
        try {
            const productsList = await this.getAll();
            let prod = productsList.find(p => p.id==id);
            return prod;
        } catch (error) {
            console.log("Error --> ", error);
        }
    }

    async deleteByID(id){
        try {
            const productsList = await this.getAll();
            if(productsList.length!=0){
                let newList = productsList.filter(p=>p.id!=id);
                let newListFile = JSON.stringify(newList, null, 2);
                await fs.promises.writeFile(this.url, newListFile);
                return "Eliminado con exito";
            }
            else{
                return "No hay elementos";
            }
        } catch (error) {
            console.log("Error --> ", error);
        }
    }
}


class Proucto{
    constructor(title, price, imgUrl){
        this.id=null;
        this.title= title;
        this.price=price;
        this.imgUrl=imgUrl;
    }
}



async function pruebas(){
    const products = new Contenedor("./products.txt");

    //-----Agregar Productos -----
    let prod1 = new Proucto("Carpeta", 560.5, "./desktop/images/carpeta.jpg");
    let newID = await products.save(prod1);
    console.log("Producto 1 ingresado con id: ", newID);

    let prod2 = new Proucto("Cartuchera", 850.3, "./desktop/images/cartuchera.jpg");
    let newID2 = await products.save(prod2);
    console.log("Producto ingresado con id: ", newID2);


    //---Listado --------
    console.log("Lista Productos: ");
    let productsList =  await products.getAll();
    console.log(productsList);

    // ---Get por id ----
    let idBusq = 1;
    let prod = await products.getByID(idBusq);
    prod ? console.log(prod) : console.log("Ningun producto tiene el id: ", idBusq);
    
    //---Eliminar con id ----
    let idDelete = 1;
    products.deleteByID(idDelete);

    //---Eliminar todo ----
    products.deleteAll();

}

pruebas();