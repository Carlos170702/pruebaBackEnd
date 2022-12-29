const express = require("express");
const {
  registerEmploye,
  getEmployeById,
  getEmployes,
  deleteEmployeArray,
} = require("./controllers/employe-controller");
const { dbConnection } = require("./config/database");
const cors = require('cors')
const { check } = require("express-validator");
const { validateFields } = require("./middlewares/validations");
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
//Clientes
app.post(
  "/registerEmploye",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("nDocument", "Maximo 30 digitos").isLength({ max: 30 }),
    check("nDocument", "Solo numeros").isNumeric(),
    check("address", "La dirección no debe estar vacia").not().isEmpty(),
    check("phone", "Numero de telefono debe ser alemnos 10 digitos").isLength({
      min: 10,
    }),
    check("phone", "Solo numeros").isNumeric(),
    validateFields,
  ],
  registerEmploye
);

app.get(
  "/getEmployeById/:employeId",
  [
    check("employeId", "Este no es un id de mongo").isMongoId(),
    validateFields,
  ],
  getEmployeById
);

app.get('/listEmployes', getEmployes)

app.delete('/deleteEmployes',[
    check('employes', 'La lista no debe de estar vacia').not().isEmpty(),
    check('employes', 'Debe de ser una lista de empleados').isArray(),
    validateFields
],  deleteEmployeArray)


app.listen(port, () => {
  dbConnection();
  console.log(`http://localhost:${port}/`);
});
