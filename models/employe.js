const { Schema, model } = require("mongoose");

const employeSchema = Schema({
  name: {
    type: String,
  },
  
  nDocument: {
    type: Number,
  },
  
  address: {
    type: String,
  },
  
  phone: {
    type: Number,
  },

});


module.exports = model("Employe", employeSchema);