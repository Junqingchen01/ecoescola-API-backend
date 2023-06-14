const dbConfig = require('../config/db.config.js');
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.URL;

db.mongoose
    .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Connected to the database!"); })
    // .catch(err => {
    //     console.log("Cannot connect to the database!", err);
    //     process.exit();
    // });

db.atividades = require("./atividade.model.js")(mongoose);

db.Reunioes = require("./reunioes.model.js")(mongoose);

db.Relatorio = require("./relatorio.model.js")(mongoose);

db.utilizadors = require("./utilizador.model.js")(mongoose);

db.Ata = require("./ata.model.js")(mongoose)


module.exports = db;