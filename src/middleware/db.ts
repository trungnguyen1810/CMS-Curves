import {AppConfig} from './../app.config';
var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit: 100,
    host: AppConfig.Host_mysql,
    user: AppConfig.User_mysql,
    password: AppConfig.Pass_mysql,
    database: AppConfig.DB_mysql
})
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})
module.exports = pool