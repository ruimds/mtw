const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const psicologoSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    servico: { type: String, required: true },
    nome: { type: String, required: true },
});

psicologoSchema.plugin(uniqueValidator);

module.exports = mongoose.model("psicologos", psicologoSchema);