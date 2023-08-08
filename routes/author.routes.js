// .TODO ARCHIVO NUEVO DE RUTAS DEBE TENER DOS COSAS
// 1. la creacion del objeto de rutas
const express = require('express');
const router = express.Router();
const Author = require('../models/Author.model');

// GET "/author/create" => renderiza el formulario de crear autores
router.get("/create", (req, res, next) => {
  res.render("authors/add-form.hbs")
})

// POST "/author/create" => recibe info del formulario y crea un autor
router.post("/create", async (req, res, next) => {
  console.log(req.body)

  // antes de crear el documento, hacemos ciertas validaciones
  if (req.body.name === "" || req.body.country === "" || req.body.yearBorn === "") {
    console.log("alguno de los campos está vacio")
    res.status(400).render("authors/add-form.hbs", {
      errorMessage: "Todos los campos son olbigatorios",
      previousNameValue: req.body.name // ejemplo de rellenar los campos con los valores previos
    })
    return; // esto detiene la funcion/ruta
  }

  if (req.body.name.length <= 3) {
    res.status(400).render("authors/add-form.hbs", {
      errorMessage: "El nombre debe tener más de 3 letras",
      previousNameValue: req.body.name,
      previousCountryValue: req.body.country,
      previousYearnBornValue: req.body.yearBorn
    })
    return; // esto detiene la funcion/ruta
  }

  try {
    
    await Author.create({
      name: req.body.name,
      country: req.body.country,
      yearBorn: req.body.yearBorn
    })

    res.redirect("/")

  } catch (error) {
    next(error)
  }
})

// GET "/author/list" => listar los nombres de los autores en la DB
router.get("/list", async (req, res, next) => {

  try {
    
    const response = await Author.find().select({name: 1})
    res.render("authors/list.hbs", {
      allAuthors: response
    })

  } catch (error) {
    next(error)
  }

})

// 2. exportar el objeto de rutas
module.exports = router;