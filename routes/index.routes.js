const express = require('express');
const router = express.Router();


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const bookRouter = require("./book.routes.js")
router.use("/book", bookRouter)
// el "/book" de arriba significa que SOLO cuando la llamada (URL) empiece en "/book" es que la busca en esas rutas
// Tambien actua como un prefijo de todas las rutas del archivo

const authorRouter = require("./author.routes.js")
router.use("/author", authorRouter)

module.exports = router;
