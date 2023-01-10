
const express = require('express');
const fs = require('fs')
const app = express();
app.use(express.json());

const port = process.env.PORT;

app.listen(3000, console.log("¡Servidor encendido!"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");

});

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("canciones.json"));
    res.json(canciones);

});

app.post("/canciones", (req, res) => {

    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    canciones.push(cancion)
    fs.writeFileSync("canciones.json", JSON.stringify(canciones))
    res.send("Canción Agregada");

});

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    const index = canciones.findIndex(p => p.id == id)
    canciones.splice(index, 1)
    fs.writeFileSync("canciones.json", JSON.stringify(canciones))
    res.send("La canción ha sido eliminada");
});

app.put("/canciones/:id", (req, res) => {
    const { id } = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    const index = canciones.findIndex(p => p.id == id)
    canciones[index] = cancion
    fs.writeFileSync("canciones.json", JSON.stringify(canciones))
    res.send("La canción ha sido modificada");
});