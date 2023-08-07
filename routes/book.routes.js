// .TODO ARCHIVO NUEVO DE RUTAS DEBE TENER DOS COSAS
// 1. la creacion del objeto de rutas
const express = require('express');
const router = express.Router();

const Book = require("../models/Book.model.js")


// GET "/book" => Busca los titulos de los libros y los renderiza en una vista
router.get("/", (req, res, next) => {

  // query interno es la condicion
  // .select es: que propiedades quiero
  Book.find()
  .select({title: 1})
  .then((response) => {
    console.log(response)
    res.render("books/list.hbs", {
      allBooks: response
    })

  })
  .catch((error) => next(error))
})


// GET "/book/:bookId/details" => Busca un libro por su id, y lo renderiza en una vista
router.get("/:bookId/details", (req, res, next) => {

  console.log(req.params)
  // const bookId = req.params.bookId
  const { bookId } = req.params
  console.log(bookId)

  // Book.findOne({_id: bookId})
  Book.findById(bookId)
  .then((response) => {
    console.log(response)
    res.render("books/details.hbs", {
      oneBook: response
    })
  })
  .catch((err) => next(err))


})


// GET "/book/create" => renderizar al usuario una vista con formulario de crear
router.get("/create", (req, res, next) => {
  res.render("books/add-form.hbs")
})

// POST "/book/create-book" => recibe la data del formulario, crea el libro y redirije al usuario.
router.post("/create-book", (req, res, next) => {

  // if (req.body.title === "") {
  //   res.redirect("/create-book")
  //   return // detiene la ruta
  // }

  console.log(req.body)
  // Body es un objeto en JS de rutas POST donde se almacena y envia toda la informacion de un formulario
  Book.create({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author
  })
  .then((response) => {
    console.log("libro creado")
    // ???
    // quiero que el usuario vaya a otra pagina cuando esto ocurra
    // res.redirect("/book")
    res.redirect(`/book/${response._id}/details`)

  })
  .catch((error) => {
    next(error)
  })


  // ...
})

// GET "/book/:bookId/update" => renderizar el formulario de edicion con los valores anteriores del libro
router.get("/:bookId/update", async (req, res, next) => {

  try {
    
    const response = await Book.findById(req.params.bookId)

    res.render("books/edit-form.hbs", {
      oneBook: response
    })
  } catch (error) {
    next(error)
  }

})


// POST "/book/:bookId/update" => recibir la data del formulario, editar el libro y redirije al usuario
router.post("/:bookId/update", (req, res, next) => {

  const bookId = req.params.bookId; // o hacer destructuracion
  const { title, description, author } = req.body

  Book.findByIdAndUpdate(bookId, {  
    title: title,
    description: description,
    author: author,
  })
  .then(() => {
    res.redirect("/book")
  })
  .catch((error) => {
    next(error)
  })

})

// POST "/book/:bookId/delete" => borrar un libro por su id y redirijir al usuario
router.post("/:bookId/delete", async (req, res, next) => {

  try {
    
    await Book.findByIdAndDelete(req.params.bookId)
    res.redirect("/book")

  } catch (error) {
    next(error)
  }

})

// 2. exportar el objeto de rutas
module.exports = router;