const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const { url } = process.env;

class ConnexionDB {
  constructor() {
    this.connexionDb = null;
  }

  generateConnexion = async () => {
    try {
      this.connexionDb = await mongoose.connect(url);
      console.log("DataBase Connected");
    } catch (error) {
      console.error("error");
      this.connexionDb = null;
    }
  };

  getConnexion() {
    if (!this.connexionDb) this.generateConnexion();
    return this.connexionDb;
  }
}

module.exports = { ConnexionDB };
