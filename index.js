const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Aquí usamos la variable que pusimos en Render
const mongoUri = process.env.Mongo_db_uri;

mongoose.connect(mongoUri)
  .then(() => console.log('✅ Conectado a MongoDB Sergio'))
  .catch(err => console.error('❌ Error de conexión:', err));

app.get('/', (req, res) => {
  res.send('SIP App Snapchat Nativo - ¡En línea! 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
