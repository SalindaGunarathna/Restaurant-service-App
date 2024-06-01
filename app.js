require('dotenv').config()
const express = require('express')
const cors = require('cors');    
const createHttpError = require('http-errors')
const bodyParser = require('body-parser');

const app = express()
app.use(express.json()); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw()); 
 
app.use(cors());



app.use ((err,req,res,next) => {
     
   
    if (createHttpError.isHttpError(err)) {
        res.status(err.status).send({massage: err.message});
    }else[
        res.status(500).send({massage: err.message}),
    ]

    // unknown error
     res.status(500).send({massage:"Unknown error"})
})

module.exports  = app