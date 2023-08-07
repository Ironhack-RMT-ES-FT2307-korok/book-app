const mongoose = require("mongoose");

// el esquema determina el formato de cada documento en la colección
const bookSchema = new mongoose.Schema( {
  title: String,
  description: String,
  author: String
} );

// el modelo la herramienta que nos permite ir a la DB
const Book = mongoose.model( "Book", bookSchema );

module.exports = Book; 

