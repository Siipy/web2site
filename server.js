const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1444689979015168050/_2Gvzu5AhHNxOJmnGqySUsW_CYm5x0SshnHOUvJmxl1XRpD1YZbFb-U5ocTZTp2bCCjl';

app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const safeMessage = message.length > 1900 ? message.slice(0, 1897) + '...' : message;

    const embed = {
      title: 'New contact form submission',
      fields: [
        { name: 'Name', value: name, inline: true },
        { name: 'Email', value: email, inline: true },
        { name: 'Message', value: safeMessage, inline: false }
      ],
      timestamp: new Date().toISOString()
    };

    const body = { embeds: [embed] };

    const resp = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('Discord responded with error:', resp.status, text);
      return res.status(502).json({ success: false, message: 'Failed to forward to Discord' });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Server error sending webhook:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Contact proxy running on http://localhost:${PORT}`);
});
