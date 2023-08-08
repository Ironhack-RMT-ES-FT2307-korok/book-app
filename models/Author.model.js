const mongoose = require("mongoose");

// el esquema determina el formato de cada documento en la colección
const authorSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  yearBorn: {
    type: Number,
    required: true
  },
} );

// el modelo la herramienta que nos permite ir a la DB
const Author = mongoose.model( "Author", authorSchema );

module.exports = Author; 

