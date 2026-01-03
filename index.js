const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors()); 
app.use(express.json()); 

// CONEXIÓN A MONGODB
const mongoURI = process.env.Mongo_db_uri; 

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Conectado a MongoDB - SIP App"))
  .catch((err) => console.error("❌ Error de conexión:", err));

// MODELO DE USUARIO
const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  edad: Number,
  fechaRegistro: { type: Date, default: Date.now }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// RUTA: REGISTRARSE
app.post('/registrar', async (req, res) => {
  try {
    const { nombre, email, password, edad } = req.body;
    const existe = await Usuario.findOne({ email: email.toLowerCase() });
    if (existe) return res.status(400).json({ error: "El correo ya está registrado en SIP App." });

    const nuevoUsuario = new Usuario({ nombre, email: email.toLowerCase(), password, edad });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario SIP registrado", usuario: nombre });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar en MongoDB" });
  }
});

// RUTA: INICIAR SESIÓN
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email: email.toLowerCase() });
    
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado en SIP App." });
    }

    if (usuario.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    res.json({ 
      mensaje: "Bienvenido a SIP App", 
      nombre: usuario.nombre
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el proceso de login" });
  }
});

app.get('/', (req, res) => {
  res.send("🚀 El motor de SIP App está encendido, Sergio.");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor de SIP App corriendo en puerto ${PORT}`);
});
