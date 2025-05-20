# WeHealtyz 🌿

[![Website](https://img.shields.io/badge/Visit-WeHealtyz-green?style=flat-square)](https://faqihalrifai.github.io/wehealtyz/)  
Website kesehatan sederhana untuk edukasi gaya hidup sehat, tips nutrisi, dan kebugaran.

---
## ⚠️ Catatan Penting (Web Statis)

Template ini **100% statis** (tanpa backend), artinya:
- Tidak ada sistem database (produk/kontak disimpan manual di HTML/JS).
- Form kontak **tidak bisa menyimpan data** (perlu integrasi layanan pihak ketiga seperti [Formspree](https://formspree.io/) atau [Netlify Forms](https://www.netlify.com/products/forms/)).
- Tidak ada fitur user login/register.
- Website ini statis. Untuk fitur dinamis, butuh integrasi tambahan.

---
-## 💎 **Kenapa Memilih Template Ini?**
Kami hadirkan solusi SEMPURNA untuk Anda yang ingin:
- Launch website skincare/klinik kecantikan dalam 1 hari
- Tanpa ribet setup database atau backend
- Cukup edit HTML sederhana dan langsung online!
- Miliki website profesional dengan biaya minimal
- Hosting gratis di GitHub Pages/Netlify
- Tidak perlu bayar developer untuk maintenance
- Fokus ke konten & produk, bukan teknis
- Update produk langsung via file HTML (tutorial included)

---
## 🚀 Fitur Utama (AI-Powered)  
- **🤖 AI Health Assistant**: Chatbot cerdas untuk konsultasi kesehatan dasar (*menggunakan model NLP*).  
- **🔍 Analisis Nutrisi AI**: Unggah foto makanan untuk analisis kalori & nutrisi (*computer vision*).  
- **📊 Rekomendasi Personalisasi**: Rekomendasi olahraga & diet berbasis data pengguna (*machine learning*).  
- **💬 Generasi Konten Otomatis**: Artikel kesehatan dibuat & diupdate oleh AI (*GPT-based*).  
- **⚠️ Prediksi Risiko Kesehatan**: Deteksi dini potensi masalah kesehatan dari input pengguna
- **Responsive Design** (Mobile, Tablet, Desktop)
- ✅ **5+ Halaman Siap Pakai**:
  - **index.html** (Beranda)
  - **skincare.html** (Produk)
  - **blog.html** (Artikel)
  - **about.html** (Tentang Kami)
  - **contact.html** (Kontak)
- ✅ **Komponen Modern**:
  - **Carousel produk**
  - **Form kontak dengan validasi**
  - **Dark mode toggle**
- ✅ **Optimasi SEO** (Meta tags, Structured Data)


---

## 🌐 Cara Akses
1. Buka link: [faqihalrifai.github.io/wehealtyz/](https://faqihalrifai.github.io/wehealtyz/)
2. Tidak perlu instalasi—bisa digunakan langsung!

---
## 🛠 Panduan Customisasi

## 1. **Ganti Warna & Font**
- Buka file `css/style.css`:
  ```css
  :root {
    --primary-color: #50C878; /* Ganti warna utama */
    --secondary-color: #FF6B6B;
    --font-primary: 'Poppins', sans-serif; /* Ganti font */}
## 2. Update Konten Produk
- Edit file pages/skincare.html:
  ---html
<div class="product">
  <img src="../assets/produk1.jpg" alt="Serum Vitamin C"> <!-- Ganti gambar -->
  <h3>Serum Vitamin C</h3> <!-- Ganti nama produk -->
  <p class="price">Rp150.000</p> <!-- Update harga -->
</div>
## 3. **Tambahkan Halaman Baru**
- Buat file baru di folder pages/ (contoh: promo.html).
Salin struktur dari index.html.
Hubungkan ke menu di index.html:
  ---html
<li><a href="pages/promo.html">Promo</a></li>
## 4. **Ganti Gambar**
Upload gambar ke folder assets/images/.
Update path di HTML:
   ---html
<img src="assets/images/header-baru.jpg" alt="Header Baru">
## 5. **Integrasi Form Kontak**
   ---Buka js/main.js:
javascript
// Ganti dengan API formspree/emailjs
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {e.preventDefault();// Kode pengiriman form...});

🔧 Teknologi Digunakan
Frontend: HTML5, CSS3, JavaScript (Vanilla)
Tools:
-Font Awesome (Ikon)
-Google Fonts (Typography)
-Swiper JS (Slider)

📌 Persyaratan Sistem
-Browser modern (Chrome, Firefox, Edge)
-Text editor (VS Code, Sublime Text)


---

## 🛠 Teknologi
- **HTML5** + **CSS3** (struktur dan desain)
- **JavaScript** (interaktivitas)
- Hosting: **GitHub Pages**

---

## 📸 Screenshot
| Halaman Utama | Fitur AI Powered |
| Layanan Saya  | Footer Modern    |
| ![Home](https://ibb.co/0yr0qCTv) | ![AI Powered](https://ibb.co/FbYmjQ75) | ![Layanan](https://ibb.co/nqf4fG7N) | ![Footer Modern](https://ibb.co/gNW0HrL) |

JIKA TIDAK BISA DIBUKA ATAU TIDAK MUNCUL GAMBAR,KLIK LINK DIBAWAH INI YANG BERISI SCREENSHOOT YANG TELAH DIBUAT PDF.

(https://pdfhost.io/v/5SgN7gESYC_screenshoot) [pdf screenshoot wehealty]

---

## 🤝 Kontribusi
1. Fork repositori
2. Buat branch fitur baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Tambahkan fitur X'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

---

## ❓ Pertanyaan Umum
**Q: Apakah website ini gratis?**  
✅ Ya, 100% gratis dan open-source.

**Q: Bagaimana cara melaporkan bug?**  
📩 Buat issue di [GitHub](https://github.com/faqihalrifai/wehealtyz) atau email ke `faqihalrf@gmail.com`.

---

## 📜 Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

<div align="center">
  <sub>Dibuat dengan ❤ oleh <a href="https://github.com/faqihalrifai">Faqih Al-Rifai</a></sub>
</div>
