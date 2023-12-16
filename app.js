const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path")
const mongoose = require("mongoose");

const notesRoutes = require("./routes/notes");

const app = express();
const port = 3000;

mongoose.connect("mongodb+srv://sayalipatil:"+ Your_Password +"@cluster0.xsl1xwo.mongodb.net/angular-db?retryWrites=true&w=majority")
    .then(() => {
        console.log('connection succesfull to mongodb')
    }).catch(() => {
        console.log('connection fail to database')
    })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/notes", notesRoutes);

app.listen(port, () => {
    console.log("server is rnning on Port 3000")
})
