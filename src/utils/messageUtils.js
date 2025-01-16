const https = require('https');

const ACCESS_TOKEN = "EAAPVeGhesjMBO2NUrO2Sz5IGS7QfZC6uZBK7oiof4VoszwP6quE2G2auR76yhYLFSzsChoiv6tif0sFKGSviLjvxtFpJjgXv3GHaMncRBzIrZBbVvnmMSFRWERNNd7xK6sIdTLv8NCeYPJUMvpGZAOztmRZCytZBPx2Lc4V3ZBhertJ8fhezp0m4zI62fd9r8k3XX4tCiiXlYw3hGPEpjK2SZBCVaZAgZD"; // Token de acceso de la API de WhatsApp

exports.sendMessage = (to, message) => {
    //const phoneNumberId = "TU_PHONE_NUMBER_ID";

    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": to,
        "type": "text",
        "text": {
            "preview_url": false,
            body: message,
        }
    });
    
    const options = {
        host: "graph.facebook.com",
        path: "/v21.0/509530568916826/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`
    
        }
    };

    const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            console.log(`Mensaje enviado a ${to}: ${message}`);
            console.log("Respuesta de la API:", JSON.parse(responseData));
        });
    });

    req.on('error', (error) => {
        console.error(`Error enviando mensaje a ${to}:`, error.message);
    });

    // Enviar los datos en la solicitud
    req.write(data);
    req.end();
};
