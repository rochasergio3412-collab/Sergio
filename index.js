const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. VARIABLE MAESTRA
const mongouri = process.env.mongo_bebe_uri;

// 2. EL ESQUEMA TOTAL (Basado en tu Plan Maestro)
const UsuarioSchema = new mongoose.Schema({
    // Identidad y Seguridad
    nombre: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    pinSeguridad: String,
    avatar: String,
    
    // Perfil y Recuperación
    correoRespaldo: String,
    tokenRecuperacion: String,
    
    // Telemetría y Globalización
    dispositivo: String,
    idioma: { type: String, default: "Español" },
    ultimaConexion: { type: Date, default: Date.now },
    ip: String,
    
    // Control Familiar y Protección de Menores
    esMenor: { type: Boolean, default: false },
    vinculoParental: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, // ID del Padre
    tokenQR: { type: String, unique: true }, // Para vinculación rápida
    
    // Memoria Multimedia (Chats, Fotos, Videos)
    mensajes: [{
        tipo: { type: String, enum: ['texto', 'foto', 'video'], default: 'texto' },
        contenido: String, // Texto o URL del archivo
        emisor: String,
        fecha: { type: Date, default: Date.now }
    }],
    
    // Soporte Técnico
    ticketsSoporte: [{
        asunto: String,
        mensaje: String,
        estado: { type: String, default: 'Abierto' },
        datosTecnicos: Object
    }]
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// 3. CONEXIÓN A LA BASE DE DATOS
async function iniciarMotorSIP() {
    if (!mongouri) {
        console.error("❌ ERROR CRÍTICO: No existe la variable mongo_bebe_uri.");
        return;
    }
    try {
        await mongoose.connect(mongouri);
        console.log("-----------------------------------------");
        console.log("✅ SIP APP: CONEXIÓN EXITOSA A MONGO_BEBE");
        console.log("✅ MOTOR LISTO PARA PROCESAR DATOS");
        console.log("-----------------------------------------");
    } catch (e) {
        console.error("❌ Fallo en el motor:", e);
    }
}

// 4. FUNCIONALIDADES CLAVE (RUTAS)

// Registro con detección de edad y generación de QR
app.post('/registrar', async (req, res) => {
    try {
        const { nombre, email, password, edad, dispositivo } = req.body;
        const esMenor = edad < 18;
        const tokenQR = `SIP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        
        const nuevo = new Usuario({
            nombre, email, password, esMenor, dispositivo, tokenQR
        });
        await nuevo.save();
        res.status(201).json({ mensaje: "Usuario SIP registrado", esMenor, tokenQR });
    } catch (e) {
        res.status(400).json({ error: "Error en registro" });
    }
});

// Guardar Multimedia (Fotos/Videos)
app.post('/multimedia/guardar', async (req, res) => {
    const { email, tipo, url } = req.body;
    await Usuario.updateOne(
        { email },
        { $push: { mensajes: { tipo, contenido: url } } }
    );
    res.json({ mensaje: "Archivo procesado y guardado en SIP App" });
});

// Soporte Técnico con Diagnóstico Automático
app.post('/soporte/ticket', async (req, res) => {
    const { email, asunto, mensaje, datosTecnicos } = req.body;
    await Usuario.updateOne(
        { email },
        { $push: { ticketsSoporte: { asunto, mensaje, datosTecnicos } } }
    );
    res.json({ mensaje: "Ticket de ayuda enviado" });
});

// 5. ARRANQUE
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    iniciarMotorSIP();
    console.log(`📡 SIP App escuchando en puerto ${PORT}`);
});
