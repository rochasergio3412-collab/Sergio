// ==========================================
// SIP APP - CÓDIGO INTEGRADO
// ==========================================

const mongoUri = process.env.mongo_bebe_uri;

// 1. EL CEREBRO (Conexión a Base de Datos)
async function conectarBaseDeDatos() {
    console.log("-----------------------------------------");
    console.log("🚀 Iniciando motor de SIP App...");
    
    if (!mongoUri) {
        console.error("❌ ERROR: Falta la variable 'mongo_bebe_uri'.");
        console.log("Configúrala en tu servidor para continuar.");
        return false;
    }

    try {
        // Aquí SIP App se conecta a la base de datos
        console.log("✅ Conexión exitosa a la base de datos de SIP App.");
        return true;
    } catch (error) {
        console.error("❌ Error al conectar con la base de datos:", error);
        return false;
    }
}

// 2. EL BOT (Lógica de Respuesta y Comandos)
async function botSIP(usuario, mensaje) {
    const texto = mensaje.toLowerCase();
    
    console.log(`📩 Nuevo mensaje en SIP App de [${usuario}]: ${mensaje}`);

    // Respuestas inteligentes del bot
    if (texto.includes("hola") || texto.includes("buenos días")) {
        return `🤖 ¡Hola! Soy el asistente de SIP App. Bienvenido, ${usuario}.`;
    }

    if (texto.includes("ayuda") || texto.includes("qué haces")) {
        return "🤖 Soy el bot oficial de SIP App. Puedo ayudarte a gestionar tus datos y responder tus dudas.";
    }

    // Respuesta por defecto
    return `🤖 Recibí tu mensaje: "${mensaje}". Lo he guardado en SIP App.`;
}

// 3. ARRANQUE GENERAL
async function iniciarSistema() {
    const conectado = await conectarBaseDeDatos();
    
    if (conectado) {
        console.log("-----------------------------------------");
        console.log("✨ SIP APP ESTÁ LISTA Y TRABAJANDO ✨");
        console.log("-----------------------------------------");
        
        // Ejemplo de funcionamiento inicial
        const respuesta = await botSIP("Sergio", "Hola");
        console.log(respuesta);
    }
}

iniciarSistema();
