const { mongoose } = require("../configuration")



const bookSchema=new mongoose.Schema({
    name: String,
    price: Number
})

const Book= mongoose.model('Book' , bookSchema)

module.exports=Book
