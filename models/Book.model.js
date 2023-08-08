const mongoose = require("mongoose");

// el esquema determina el formato de cada documento en la colección
const bookSchema = new mongoose.Schema( {
  title: String,
  description: String,
  author:[
    {
      type: mongoose.Schema.Types.ObjectId, // el tipo de data será una relacion a otro documento de la DB
      ref: "Author" // nombre del modelo a la cual se entra relacionado ese documento 
    }
  ] 
} );

// el modelo la herramienta que nos permite ir a la DB
const Book = mongoose.model( "Book", bookSchema );

module.exports = Book; 

