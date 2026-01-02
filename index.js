const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Poniendo el enlace directo para que no haya errores de "undefined"
const MONGO_URI = "mongodb+srv://Sergio:mi358q@cluster0.tjlqxpj.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ ¡VICTORIA! Siri App conectada directamente al mongo bebé"))
  .catch((err) => console.log("❌ Error en los datos del enlace:", err.message));

const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Siri App de Sergio: ¡CONECTADA DIRECTAMENTE!');
});

app.listen(PORT, () => {
  console.log("🚀 Servidor corriendo en puerto", PORT);
});
