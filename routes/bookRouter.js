const { bookController } = require("../controllers");

const express = require("express");
const router = express.Router();

router.get("/getBooks", bookController.getBooks);
router.post("/addNewBook", bookController.addNewBook);
router.post("/deleteBook/:id", bookController.deleteBook);
router.post("/updateBook/:id", bookController.updateBook);

router.get("/filterByName", bookController.filterByName);
router.get("/filterByPrice", bookController.filterByPrice);
router.get("/cfind", bookController.cfind);





module.exports = router;
