// ==========================================
// SIP APP - SISTEMA INTEGRADO TOTAL (Sergio)
// ==========================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. VARIABLE DE ENTORNO
const mongouri = process.env.mongo_bebe_uri;

// 2. ESQUEMA DE DATOS TOTAL (Toda la información de SIP App)
const UsuarioSchema = new mongoose.Schema({
    // --- Identidad ---
    nombre: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "perfil_sip.png" },

    // --- Seguridad y Telemetría ---
    fechaRegistro: { type: Date, default: Date.now },
    ultimaConexion: { type: Date, default: Date.now },
    dispositivo: { type: String, default: "Snapchat Nativo" },
    versionApp: { type: String, default: "1.0.0" },
    ip: String,

    // --- Preferencias del Usuario ---
    modoOscuro: { type: Boolean, default: true },
    notificaciones: { type: Boolean, default: true },
    idioma: { type: String, default: "Español" },

    // --- Memoria de SIP App (Historial de Chat) ---
    historialChat: [{
        emisor: String, 
        texto: String,
        fecha: { type: Date, default: Date.now }
    }]
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// 3. FUNCIÓN DE CONEXIÓN A MONGO_BEBE_URI
async function conectarBaseDeDatos() {
    if (!mongouri) {
        console.error("❌ ERROR: Falta variable mongo_bebe_uri en Render.");
        return false;
    }
    try {
        await mongoose.connect(mongouri);
        console.log("✅ SIP App conectada a mongo_bebe_uri con éxito.");
        return true;
    } catch (error) {
        console.error("❌ Error al conectar base de datos de SIP App:", error);
        return false;
    }
}

// 4. FUNCIONALIDAD: REGISTRO COMPLETO
app.post('/registrar', async (req, res) => {
    try {
        const { nombre, email, password, dispositivo } = req.body;
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password,
            dispositivo: dispositivo || "Snapchat Nativo",
            ip: req.ip
        });
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: "Registro exitoso en SIP App", usuario: nombre });
    } catch (error) {
        res.status(400).json({ error: "No se pudo registrar en SIP App" });
    }
});

// 5. FUNCIONALIDAD: LOGIN Y ACTUALIZACIÓN
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOneAndUpdate(
            { email, password },
            { ultimaConexion: new Date() },
            { new: true }
        );
        if (usuario) {
            res.json({ 
                mensaje: "Bienvenido a SIP App", 
                nombre: usuario.nombre 
            });
        } else {
            res.status(401).json({ error: "Credenciales inválidas en SIP App" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error de servidor" });
    }
});

// 6. FUNCIONALIDAD: MEMORIA DEL CHAT
app.post('/chat/guardar', async (req, res) => {
    try {
        const { email, emisor, texto } = req.body;
        await Usuario.updateOne(
            { email },
            { $push: { historialChat: { emisor, texto } } }
        );
        res.json({ mensaje: "Memoria de SIP App actualizada" });
    } catch (error) {
        res.status(500).json({ error: "Error al guardar mensaje" });
    }
});

// 7. ARRANQUE DEL MOTOR
async function iniciarSistema() {
    const conectado = await conectarBaseDeDatos();
    if (conectado) {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log("------------------------------------");
            console.log("🚀 MOTOR DE SIP APP EN LÍNEA");
            console.log(`📡 Servidor: https://sergio-1.onrender.com`);
            console.log("------------------------------------");
        });
    }
}

iniciarSistema();
