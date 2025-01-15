const https = require('https');

const ACCESS_TOKEN = "EAAHNBBZB0AlkBO6xf25GxlrUc3XQGn51gTPatf9htZAYJxIQPaS4hz5kTQ5rdWh8Or1os0ZCfYD2O2Y6LZC2y4vVXoPJyzhwnA2zSskxJZAYaw8WQk0PFc0dijwpHTg8IraTGeqYDsZBHT7duchGxObeAtYVh8ooG9hd5yBkuwfzLrZB6vir1ZCa1DZBulGkZC1HUvlpRGtErui9gYZB0RAe0cXEtqInyAQ3hjXKxgZD"; // Token de acceso de la API de WhatsApp

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
        path: "/v20.0/392632663943668/messages",
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
