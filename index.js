const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// ORDEN: Buscar la variable de entorno que configuramos en Render
const MONGO_URI = process.env.mongo_db_uri;

// Verificar si la variable existe antes de intentar conectar
if (!MONGO_URI) {
    console.log("❌ ERROR: La variable 'mongo_db_uri' no está configurada en Render.");
} else {
    mongoose.connect(MONGO_URI)
        .then(() => console.log("✅ SIP App conectada al mongo db barra baja"))
        .catch((err) => console.log("❌ Error de conexión en Mongo:", err.message));
}

const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
    res.send('Siri App de Sergio: ¡Estamos en línea!');
});

app.listen(PORT, () => {
    console.log("🚀 SIP App corriendo en puerto", PORT);
});
