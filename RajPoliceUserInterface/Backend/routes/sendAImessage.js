const express = require('express');

// Router Configurations
const router = express.Router();

// Route to handle user messages
router.post('/AI', async (req, res) => {
    const { message } = req.body;

    // Replace 'YOUR_BOTPRESS_URL' with the actual URL of your Botpress instance
    const messagingUrl = "https://messaging.botpress.cloud";
    const webhookId = "90aa5e47-e158-4b22-882d-3737b10524e";

    const botpressWebhookUrl = `${messagingUrl}/api/v1/bots/web/${webhookId}/incoming`;

    try {
        const botpressResponse = await fetch(botpressWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: {
                    content: message,
                },
            }),
        });

        const data = await botpressResponse.json();
        res.json(data);
    } catch (error) {
        console.error('Error communicating with Botpress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
