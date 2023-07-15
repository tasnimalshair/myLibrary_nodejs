const { Book } = require("../schemas");
const { ObjectId } = require("bson");
const { msg } = require("../structuring");
const createError = require("http-errors");

const getBooks = async (req, res, next) => {
  const books = await Book.find();
  msg(res, 200, true, "", books);
};

const addNewBook = async (req, res, next) => {
  const { name, price } = req.query;
  if (name && price > 0) {
    // const book = new Book({
    //     name: name,
    //     price: price,
    //   });
    //   await book.save();

    Book.updateOne(
      { name: name },
      { $set: { name: name, price: price } },
      { upsert: true }
    ).then((result) => {
      msg(res, 200, true, "Done Successfully", null);
    });
  } else {
    msg(res, 400, false, "Name or price is not valid", null);
  }
};

const deleteBook = async (req, res, next) => {
  const _id = req.params.id;
  if (!ObjectId.isValid(_id)) {
    return next(createError("400", "Id is not valid"));
  } else {
    const book = await Book.deleteOne(new ObjectId(_id));

    msg(res, 200, true, "Book deleted successfully", null);
  }
};

const updateBook = async (req, res, next) => {
  const _id = req.params.id;
  const { name, price } = req.body;
  console.log(req.body);
  if (ObjectId.isValid(_id)) {
    const book = await Book.updateOne(
      { _id: new ObjectId(_id) },
      { name: name, price: price }
    );
    msg(res, 200, true, "Book updated successfully");
  } else {
    return next(createError("404", "Book is not exist"));
  }
};

const filterByName = async (req, res, next) => {
  var name = req.query.name;
  if (name) {
    const books = await Book.find({ name: new RegExp(name, "i") });
    if (books.length == 0) {
      return next(createError("404", "No book with this name"));
    }
    msg(res, 200, true, "", books);
  } else {
    msg(res, 400, false, "Please enter name to search", null);
  }
};

const filterByPrice = async (req, res, next) => {
  const { low, high } = req.query;
  if (low > 0 && high > 0) {
    const books = await Book.find({ price: { $gte: low, $lte: high } }).sort({
      price: 1,
    });
    if (!books) {
      return next(createError("404", "No books found"));
    }
    msg(res, 200, true, "", books);
  } else {
    return next(createError(400, "Range is invalid"));
  }
};

const cfind=async(req,res,next)=>{
  // const books=await Book.find().and([{name: 'life is hard'} , {price : 400}])
  // msg(res , 200 , true , "" , books)
  res.json(null||'string')
}
module.exports = {
  getBooks,
  addNewBook,
  deleteBook,
  updateBook,
  filterByName,
  filterByPrice,
  cfind
};
