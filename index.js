const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/kirim-pesan', (req, res) => {
  const { text, tokenBot, chatId } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Teks pesan tidak boleh kosong' });
  }
  if (!tokenBot) {
    return res.status(400).json({ message: 'Token bot tidak boleh kosong' });
  }
  if (!chatId) {
    return res.status(400).json({ message: 'Chat ID tidak boleh kosong' });
  }
  axios.post(`https://api.telegram.org/bot${tokenBot}/sendMessage`, {
    chat_id: chatId,
    text: text
  })
  .then(response => {
    res.json(response.data);
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengirim pesan' });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

module.exports = app;
