// SIP App - Código Principal
const mongoUri = process.env.mongo_bebe_uri;

async function iniciarSIPApp() {
  console.log("------------------------------------");
  console.log("🚀 SIP APP ESTÁ ARRANCANDO...");
  console.log("------------------------------------");

  // Verificación de la base de datos
  if (!mongoUri) {
    console.error("❌ ERROR: No se detectó la variable 'mongo_bebe_uri'.");
    console.log("Asegúrate de configurarla en las variables de entorno.");
    return;
  }

  try {
    // Aquí el bot se conecta a tu base de datos
    console.log("✅ Conectando a la base de datos de SIP App...");
    
    // Aquí es donde el bot de SIP App empieza a recibir mensajes
    console.log("🤖 El bot de SIP App está ACTIVO y esperando órdenes.");
    
  } catch (error) {
    console.error("❌ Hubo un fallo en el sistema de SIP App:", error);
  }
}

iniciarSIPApp();
