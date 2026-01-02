const express = require('express');
const mongoose = require('mongoose');

const app = express();

// REVISA BIEN ESTA LÍNEA: 
// Cambia 'Sergio' y 'TU_CONTRASEÑA' por tus datos reales de MongoDB
const MONGO_URI = "mongodb+srv://Sergio:TU_CONTRASEÑA@cluster0.tjlqxpj.mongodb.net/SiriApp?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ ¡VICTORIA TOTAL! Siri App conectada al mongo bebé"))
  .catch((err) => {
    console.log("❌ ERROR DE CONEXIÓN:");
    console.log(err.message);
  });

app.get('/', (req, res) => {
  res.send('Siri App de Sergio: Esperando conexión...');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("🚀 Servidor en puerto", PORT));
