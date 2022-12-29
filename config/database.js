const mongoose = require("mongoose");
const CONFIG = require("./config");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(CONFIG.DB);
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la BD ver logs");
  }
};

module.exports = {
  dbConnection,
};
