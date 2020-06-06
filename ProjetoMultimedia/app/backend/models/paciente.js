const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const pacienteSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    emailpsicologo: { type: String, required: true },
    genero: { type: String, required: true },
    idade: { type: Number, required: true },
});

pacienteSchema.plugin(uniqueValidator);

module.exports = mongoose.model("pacientes", pacienteSchema);