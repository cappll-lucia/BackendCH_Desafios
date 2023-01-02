import knex from 'knex';
import{ nextID } from '../../src/scripts/functions.js';
let fs = require('fs');



class Chat{
    constructor(config, route){
        this.knex = knex(config),
        this.route = route
    }


    async getAll(){
        try{
            const chat = await this.knex('chat').select('*');
        }
        catch(err){

        }
    }
}