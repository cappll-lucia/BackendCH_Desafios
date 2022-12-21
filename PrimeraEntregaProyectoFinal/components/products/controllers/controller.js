
const fs = require('fs');

class Controller{
    constructor(url){
        this.url=url;
    }

    async getAll(){
        try{
            let productList = await fs.promises.readFile(this.url, "utf-8");
            return productList;
        }catch (error){
            console.log("Error-->", error);
            return [];
        }
    }

    async getMaxID(){
        const productList = await this.getAll();
        const idList = productList.map(prod => {
            return prod.id;
        });
        return Math.max(...idList);
    }


    async save(obj){
        try{
            const productList = await this.getAll();
            obj.id= await this.getMaxID()+1;
            productList.push(obj);
            let productListFile = JSON.stringify(productList, null, 2);
            await fs.promises.writeFile(this.url, productListFile);
            return obj;
        }catch(error){
            console.log(`error--> ${error}`);
            throw error;
        }
    }

    async getByID(id){
        try{
            const productsList = await this.getAll();
            let prod = productsList.find(p => p.id==id);
            if(prod){
                return prod;
            }
            else{
                return [{error: `No existen productos con id=${id}`}];
            }
        }catch(error){
            console.log(`Error--> ${error}`);
        }
    }


    async deleteByID(id){
        try {
            const productList = await this.getAll();
            if(productList.length!=0){
                let newList = productList.filter(p=>p.id!=id);
                let newListFile = JSON.stringify(productList, null, 2);
                await fs.promises.writeFile(this.url, newListFile);
                return 'Eliminado exitosamente';
            }
            else{
                return [{error: `No existen productos con id=${id}`}];
            }
        } catch (error) {
            console.log(`Error--> ${error}`);
        }
    }

    async updateByID(id, prod){
        try{
            let productList = await this.getAll();
            if(productList.length!=0){
                let myProd = productList.find(p=>p.id==id);
                if(myProd){
                    myProd.timeStamp=Date.now();
                    myProd.title=prod.title;
                    myProd.description=prod.description;
                    myProd.imgUrl=prod.imgUrl;
                    myProd.price=prod.price
                    myProd.stock=prod.stock;
                    
                    let newList = productList.filter(p=>p.id!=id);
                    newList.push(myProd);
                    let newListFile = JSON.stringify(newList, null, 2);
                    await fs.promises.writeFile(this.url, newListFile);
                    return ["Producto actualizado con exito", myProd];
                }
                else{
                    return [{error: `No existen productos con id=${id}`}]
                }
            }else{
                return [{error: `No existen productos registrados`}]
            }
        }catch(error){
            console.log(`Error--> ${error}`);
        }
    }
}


module.exports=Controller;
