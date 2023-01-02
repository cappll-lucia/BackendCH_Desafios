export default {
    mariaDB: {
        client : 'mysql',
        connection:{
            host: 'localhost',
            user:'root',
            password:'lucia',
            database:'bK_ch'
        }
    },
    sqlite3: {
        client:'sqlite3',
        connection:{
            filename:'./DB/ecommerce.sqlite'
        },
        useNullAsDefault:true
    },
}
