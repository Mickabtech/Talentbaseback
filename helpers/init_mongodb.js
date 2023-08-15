const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongodbUrl = process.env.MONGODB_URL;
const dbname = process.env.DB_NAME;

mongoose.connect(mongodbUrl, {dbName: dbname}).then(()=>{
    console.log("mongodb connected")
})
.catch((err) =>{

    console.log(err.message)
})

mongoose.connection.on('connected', ()=>{
    console.log('mongoose connected to db')
});

mongoose.connection.on('error', (err)=>{
    console.log(err.message)
});

mongoose.connection.on('disconnected', ()=>{
    console.log('mongoose connection is disconnected')
})

process.on('SIGINT', async()=>{
    await mongoose.connection.close();
    process.exit(0)
})