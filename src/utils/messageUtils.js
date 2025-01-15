const https = require('https');

const ACCESS_TOKEN = "EAAPVeGhesjMBO75LLgeAGQ0ZBwZCYZAQ12iO1ZBeQmrLYchZCPiHE8rG9ApO71V3fP88HpHjcbYINmEzn6XNXcsgY5BUgSCVPwBeTulfsjT5V3OkqRDZAkOJpZCCWZBLUO1vnzNlT9DpF6w0F1DWFBC75gataxi1JV3HtGdqMVv6xZAmO0lJQLZCf9VUZCQ8uZC0ykijyUY8WSzBCygzXYLvvHbnyi1ee1MZD"; // Token de acceso de la API de WhatsApp

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
