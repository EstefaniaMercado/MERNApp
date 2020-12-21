// Puerto

process.env.PORT = process.env.PORT || 8000;


//Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


//Vencimiento del token
process.env.CADUCIDAD_TOKEN = '48h'


//seed
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'



//Base de datos

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/frontendExam'
} else {
    // urlDB = 'mongodb+srv://strider:is0x46WS5mxpvg25@cluster0.lhyvx.mongodb.net/cafe'
    urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB;