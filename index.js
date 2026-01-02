const express = require('express');
const mongoose = require('mongoose');
const app = express();

const MONGO_URI = process.env.mongo_db_uri; 
const PORT = process.env.PORT || 10000;

mongoose.connect(MONGO_URI)
  .then(() => console.log("¡SIP App conectada al mongo db barra baja!"))
  .catch((err) => console.log("Error de conexión:", err));

app.get('/', (req, res) => {
  res.send('SIP App: Servidor Limpio y Conectado.');
});

app.listen(PORT, () => {
  console.log("SIP App corriendo en puerto", PORT);
});
