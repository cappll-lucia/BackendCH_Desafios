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


module.exports=Contenedor;