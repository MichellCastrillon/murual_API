const https = require('https');

const ACCESS_TOKEN = "EAAPVeGhesjMBO2XZAzkqT5rNP6BHqSritMUpZCumQtSYxjRbQ0sBNiSkgvGkH7DXfqrYNssQOHBWM7uWqHkZB8UpEhvzSo2pgYBW8ghvUebGc7QVjcuhlD7kXn5Ws6GQ8lpZC7o8n4nzIq0zcndoqwKm7ZBX8oZBigBuMpnshARAeIq4iuiuZAzsSRts72w5FCbjEfdZABvOgeSpqqDreDtv4ZBdrM4cZD"; // Token de acceso de la API de WhatsApp

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
