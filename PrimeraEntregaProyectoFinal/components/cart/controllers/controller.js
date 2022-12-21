
const fs = require('fs');

class Controller{
    constructor(url){
        this.url=url;
    }


    async getAll(){
        try {
            let cartList = await fs.promises.readFile(this.url, 'utf-8');
            return cartList;
        } catch (error) {
            console.log(`Error--> ${error}`);
            return [];
        }
    }

    async getMaxID(){
        const cartList = await this.getAll();
        const idList = cartList.map(cart => {return  cart.id;});
        return Math.max(...idList);
    }

    async save(cart){
        try {
            const cartList = await this.getAll();
            cart.id = await this.getMaxID()+1;
            cartList.push(cart);
            let cartListFile = JSON.stringify(cartList, null ,2);
            await fs.promises.writeFile(this.url, cartListFile);
            return cart;
        } catch (error) {
            console.log(`Error--> ${error}`);
            throw error;
        }
    }

    async getByID(id){
        try{
            const cartList = await this.getAll();
            let cart = cartList.filter(c=>c.id==id);
            if(cart){
                return cart;
            }
            else{
                return [{error: `No existen carritos con id=${id}`}];
            }
        }
        catch(error){
            console.log(`Error--> ${error}`);
        }
    }

    async deleteByID(id){
        try{
            const cartList = await this.getAll();
            if(cartList.length!=0){
                let newList = cartList.filter(c=>c.id!=id);
                let newListFile = JSON.stringify(newList, null, 2);
                await fs.promises.writeFile(this.url, newListFile);
                return 'Eliminado exitosamente';
            }
            else{
                return [{error: `No existen carritos con id=${id}`}];
            }
        }catch (error) {
            console.log(`Error--> ${error}`);
        }            
    }


    async updateByID(id, cart){
        try {
            let myCart = this.getByID(id);
            if(myCart){
                myCart.timeStamp=Date.now();
                myCart.products=cart.products;
                
                let newList = this.getAll().filter(c=>c.id!=id);
                newList.push(myCart);
                let newListFile = JSON.stringify(newList, null,2);
                await fs.promises.writeFile(this.url, newListFile);
                return ["Carrito actualizado exitosamente"];
            }
            else{
                return [{error: `No existen carritos con id=${id}`}]
            }
        } catch (error) {
            console.log(`Error--> ${error}`);
            
        }
    }

    async addProdutctsToCart(idCart, arrNewProds){
        try {
            let myCart = this.getByID(Number(idCart));
            if(myCart){
                    myCart.products=myCart.push(...arrNewProds);
                    myCart.timeStamp=Date.now();

                    let newList = this.getAll().filter(c=>c.id!=idCart);
                    newList.push(myCart);
                    let newListFile = JSON.stringify(newList, null,2);
                    await fs.promises.writeFile(this.url, newListFile);
                    return ["Carrito actualizado exitosamente", myCart];
            }else{
                return [{error: `No existen carritos con id=${id}`}]
            }
        } catch (error) {
            console.log(`Error--> ${error}`);
        }
    }


    async deleteProdFromCart(idCart, idProd){
        try{
            let myCart = this.getByID(idCart);
            if(myCart){
                myCart.products = myCart.products.filter(p=>p.id!=idProd);
                this.updateByID(idCart, myCart);
                return [`Actualizado con exito`, myCart];
            }
            else{
                return [{error: `No existen carritos con id=${id}`}]            }
        }
        catch(error){
            console.log(`Error--> ${error}`);
        }
    }


}

module.exports=Controller;