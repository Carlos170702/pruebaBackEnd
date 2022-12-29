const { request, response } = require("express");
const Employe = require("../models/employe");
const { isValidObjectId, default: mongoose,  } = require("mongoose");
const registerEmploye = async (req = request, res = response) => {
  const data = req.body;
  const employe = new Employe(data);
  employe.save();

  return res.status(200).json({
    msg: "Datos del cliente guardados",
    status: true,
    employe,
  });
};

const getEmployeById = async (req, res) => {
  const { employeId } = req.params;
  const employe = await Employe.findById(employeId);
  if (employe === null) {
    return res.status(400).json({
      status: false,
      msg: "No existe un usuario con este id",
    });
  }
  return res.status(200).json({
    status: true,
    msg: "Usuario obtenido con este id",
    employe,
  });
};

const getEmployes = async (req, res) => {
  const employes = await Employe.find().sort({
    $natural: -1,
  });
  return res.status(200).json({
    status: true,
    employes,
  });
};

const deleteEmployeArray = async (req, res) => {
  const { employes } = req.body;
  
  for (const employe in employes) {
      const mongoId = mongoose.Types.ObjectId(employes[employe])
      await Employe.findByIdAndDelete(mongoId)
  }
  return res.status(200).json({
    status: true,
    msg: "Usuarios eliminados",
  });
};

module.exports = {
  registerEmploye,
  getEmployeById,
  getEmployes,
  deleteEmployeArray,
};
