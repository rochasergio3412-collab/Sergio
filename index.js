const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Agregado para que Siri app conecte con el móvil

const app = express();
app.use(express.json());
app.use(cors());

// Esta es la variable que busca en Render
const MONGO_URI = process.env.mongo_db_uri;
const PORT = process.env.PORT || 10000;

mongoose.connect(MONGO_URI)
  .then(() => console.log("¡SIP App conectada al mongo db barra baja!"))
  .catch((err) => console.log("Error de conexión:", err));

app.get('/', (req, res) => {
  res.send('SIP App: Servidor Limpio y Conectado.');
});

// Ruta para recibir mensajes de la Siri app
app.post('/enviar', async (req, res) => {
  console.log("Mensaje recibido:", req.body);
  res.json({ estado: "recibido" });
});

app.listen(PORT, () => {
  console.log("SIP App corriendo en puerto", PORT);
});
