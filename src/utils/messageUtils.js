const https = require('https');

const ACCESS_TOKEN = "EAAPVeGhesjMBOxsxxCClZCGf8UoEKdsiWoZBVL1ZCR3mXi1ZA8McV0yhomiGMsqIlZAx5b3xTPrZCzgPHq64cE1OZAwbs8omW5UEUai6P68RoxgfzZCAVQD6NryERIcjdJOSshnrK9iB5FQMBYVwGZC0VHIa01u47uawKrT1bhCH33oVizQwhUX4w6iSGovFu8248ySA1zwtFqHced3HymV8kL5TvTA4ZD"; // Token de acceso de la API de WhatsApp

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
