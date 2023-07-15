const express = require('express');
const app=express();
const port =6060
const routes = require('./routes');
const bodyParser = require('body-parser')

// app.use(express.json())


app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))
routes(app)


app.use((req, res, next) => {
    next(createError(404));
})


app.use((error,req,res,next)=>{
    res.status(error.status).json({
        status: false,
        message: error.message
    })
})

app.listen(port,()=>{
    console.log(`SERVER RUN IN http://localhost:${port}`);
});

