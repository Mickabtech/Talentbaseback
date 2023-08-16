const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const dotenv = require('dotenv');
require('./helpers/init_mongodb');
const cors = require("cors");
const { verifyAccessToken } = require('./helpers/jwtHelper')
require('./helpers/init_redis')



const AuthRoute = require('./Routes/Auth.route');



dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', verifyAccessToken, async (req, res, next) =>{
    res.send("Evian is active.....")
});

app.use('/auth', AuthRoute);

app.use(async (req, res, next) =>{
    // const error = new Error("Not found")
    // error.status = 404
    // next(error)
    next(createError.NotFound("This route does not exist"))
})  

app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})