import knex from 'knex';
import config from '../scripts/config.js';

//chat with SQLite3
const sqliteCli = knex(config.sqlite3);
try{
    await sqliteCli.schema.dropTableIfExists('chat')
    .finally(async ()=>{
        return await sqliteCli.schema.createTable('chat', table=>{
            table.increments('id').primary();
            table.string('usr', 20).notNullable();
            table.string('dateTime', 50).notNullable();
            table.string('msjContent', 200).notNullable();
        console.log('Tabla chat Creada con exito');

        })
    })
} catch(err){
    console.log(`Error--> ${err}`);
    throw err;
}finally{
    sqliteCli.destroy();
}



//products with MariaDB
const mariaDBCli = knex(config.mariaDB);
try{
    await mariaDBCli.schema.dropTableIfExists('products');
    await mariaDBCli.schema.createTable('products', table=>{
        table.increments('id').primary();
        table.string('title').notNullable();
        table.float('price').notNullable();
        table.text('imgUrl');
        console.log('Tabla Products Creada con exito');
    })
} catch(err){
    console.log(`Error--> ${err}`);
}finally{
    mariaDBCli.destroy();
}