const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const psicologoRoutes = require("./routes/psicologo");
const pacienteRoutes = require("./routes/paciente");

const app = express();

const url =
    "mongodb+srv://brunosilva:Bruno-1998@cluster0-mubfv.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true";


mongoose
    .connect(
        url,
        { useUnifiedTopology: true, useNewUrlParser: true }
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/psicologo", psicologoRoutes);
app.use("/api/paciente", pacienteRoutes);

module.exports = app;