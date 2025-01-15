const https = require('https');

const ACCESS_TOKEN = "EAAPVeGhesjMBO7sJL0LU35c65uUMlMddoaH9KOavWNmjUSqCwrgNqbEtZAvWtuntAZACzsJlqJIZBF4UqgR4tkrpwwZCQagPc2G2UShdc97RlgJn7j5JpwamSWhLUn4fgpRQOOkFtJ7logE97c6tIzdJ0k0aSpTOArnI7ZA8jbxYLGNv6KSgGYx37QQ6ULNGHiTyuSeglXuib9wgWm6IYb8hZCeRMZD"; // Token de acceso de la API de WhatsApp

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
