const https = require('https');

const ACCESS_TOKEN = "EAAPVeGhesjMBO8NBJ0iZC5eHOZAx91CGk0H7jcqPnDosEkvkQVT8BsGUf52uDrdntCJZA6iLUiVugtcO1LBzY3vLpBy7fH3gNw3qAKKfV9kzpjkiNoMvp7ZCsYWBQLjEQBwn6LS47c4wI7MLYS1imZAiFORfUfSBJSRJugjSAdMIUpFvTe42SmfWHSk3LgNAwdaioZCOGM5u8JenJetedZBYiqpNBAZD"; // Token de acceso de la API de WhatsApp

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
