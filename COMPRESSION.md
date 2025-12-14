# 🗜️ Panduan Kompresi Gambar untuk VELIXIER

## 📋 Daftar File yang Perlu Dikompres

### 🔴 Prioritas Tinggi (Ukuran Besar)
1. **Joe Depa_Head of Innovation.jpg** - `1.2 MB` → Target: `~200 KB`
2. **Chanel Bleu_Homme.jpg** - `955 KB` → Target: `~300 KB`
3. **Jonathan Anderson_Creative Director.jpg** - `363 KB` → Target: `~150 KB`

### 🟡 Prioritas Sedang (Ukuran Medium)
4. **Rafly Taufika_Founder & Master Perfume.jpg** - Target: `~150 KB`
5. **Steven Spielberg_quality director.jpg** - Target: `~150 KB`
6. **Tom Ford_Black Orchid.jpg** - Target: `~250 KB`
7. **Dior_Sauvage.jpg** - Target: `~250 KB`

### 🟢 Gallery Photos (Behind The Scenes)
8. **Laboratory.jpeg** - Target: `~200 KB`
9. **Ingredients.jpeg** - Target: `~200 KB`
10. **Distillation.jpeg** - Target: `~200 KB`
11. **Composition.jpeg** - Target: `~200 KB`
12. **Testing.jpeg** - Target: `~200 KB`
13. **Bottling.jpeg** - Target: `~200 KB`

---

## 🛠️ Tools untuk Kompresi

### 1. **TinyPNG** (Rekomendasi Utama)
- **Website**: https://tinypng.com/
- **Kelebihan**: 
  - Gratis untuk 20 file per batch
  - Kompresi otomatis tanpa loss kualitas visual
  - Drag & drop mudah
  - Bisa batch processing
- **Cara Pakai**:
  1. Buka https://tinypng.com/
  2. Drag & drop file gambar (maksimal 20 file sekaligus)
  3. Tunggu proses kompresi selesai
  4. Download hasil kompresi
  5. Replace file asli di folder `src/assets/`

### 2. **Squoosh** (Google)
- **Website**: https://squoosh.app/
- **Kelebihan**:
  - Offline capable (PWA)
  - Kontrol penuh atas kualitas kompresi
  - Preview before/after real-time
  - Support berbagai format (WebP, AVIF, MozJPEG)
- **Cara Pakai**:
  1. Buka https://squoosh.app/
  2. Upload 1 file
  3. Pilih format output: **MozJPEG** atau **WebP**
  4. Set quality: **80-85%**
  5. Compare hasil di preview
  6. Download dan replace file

### 3. **ImageOptim** (Mac Only)
- **Website**: https://imageoptim.com/
- **Kelebihan**: Desktop app, batch processing unlimited
- **Cara Pakai**: Drag folder ke aplikasi

### 4. **ImageMagick** (Command Line)
```bash
# Install ImageMagick terlebih dahulu
# Windows: https://imagemagick.org/script/download.php

# Compress single file
magick convert input.jpg -quality 85 -strip output.jpg

# Batch compress all JPG files
magick mogrify -path ./compressed -quality 85 -strip *.jpg
```

---

## 📐 Pengaturan Kompresi yang Disarankan

### Untuk Team Photos (Portrait)
- **Format**: JPEG atau WebP
- **Quality**: 85%
- **Dimensions**: Maksimal 800x800px
- **Target Size**: 150-200 KB

### Untuk Product Images
- **Format**: JPEG atau WebP
- **Quality**: 85%
- **Dimensions**: Maksimal 1200x1200px
- **Target Size**: 250-300 KB

### Untuk Gallery Photos (Behind The Scenes)
- **Format**: JPEG atau WebP
- **Quality**: 80%
- **Dimensions**: Maksimal 1000x1000px
- **Target Size**: 200 KB

---

## 🎯 Langkah-Langkah Kompresi

### Metode 1: TinyPNG (Paling Mudah)
```bash
1. Buka https://tinypng.com/
2. Drag 20 file pertama ke halaman
3. Tunggu hingga selesai (ada indikator persentase)
4. Klik "Download All" untuk download ZIP
5. Extract ZIP ke folder baru
6. Copy file hasil kompresi ke `src/assets/`
7. Replace file lama
8. Ulangi untuk file berikutnya
```

### Metode 2: Squoosh (Kontrol Penuh)
```bash
1. Buka https://squoosh.app/
2. Upload file pertama
3. Di panel kanan, pilih "MozJPEG" atau "WebP"
4. Set Quality Slider ke 85
5. Cek preview - pastikan masih bagus
6. Klik icon download di kanan bawah
7. Save ke folder `src/assets/`
8. Repeat untuk setiap file
```

### Metode 3: Batch dengan ImageMagick (Advanced)
```bash
# Masuk ke folder assets
cd "d:\Perkuliahan Rafly\Semester 5\Desain Web\Tugas Besar\Web-Design\src\assets"

# Buat folder backup
mkdir backup
copy *.jpg backup\
copy *.jpeg backup\

# Compress semua JPG dengan quality 85
magick mogrify -quality 85 -strip *.jpg

# Compress semua JPEG dengan quality 85
magick mogrify -quality 85 -strip *.jpeg
```

---

## ✅ Checklist Setelah Kompresi

- [ ] Cek ukuran file - pastikan sudah turun signifikan
- [ ] Buka website di browser
- [ ] Cek visual semua gambar - pastikan masih tajam
- [ ] Test di mobile - pastikan loading lebih cepat
- [ ] Run `npm run build` - cek total bundle size
- [ ] Commit changes ke git

---

## 📊 Expected Results

### Before Compression:
- **Total Assets Size**: ~5-6 MB
- **Initial Page Load**: ~2-3 detik
- **Lighthouse Performance**: ~70-80

### After Compression:
- **Total Assets Size**: ~2-3 MB (reduce 50%)
- **Initial Page Load**: ~1-1.5 detik
- **Lighthouse Performance**: ~85-95

---

## 💡 Tips Tambahan

1. **WebP Format**: Jika ingin hasil lebih kecil, convert ke WebP (support di semua modern browser)
2. **Lazy Loading**: Sudah diimplementasi dengan `loading="lazy"` attribute
3. **CDN**: Pertimbangkan upload gambar ke Cloudinary atau ImgIX untuk optimasi otomatis
4. **Responsive Images**: Bisa pakai `srcset` untuk serve different sizes di mobile vs desktop

---

## 🚀 Conversion ke WebP (Optional)

### Menggunakan Squoosh:
1. Upload file
2. Pilih **WebP** di panel kanan
3. Set Quality: **85**
4. Download

### Update kode untuk support WebP:
```vue
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Fallback">
</picture>
```

---

## ⚠️ Catatan Penting

- **Backup dulu** semua file original sebelum kompress
- Jangan compress ulang file yang sudah dicompress (quality loss)
- Test visual di berbagai device setelah kompresi
- Kalau ada gambar yang jadi blur, naikan quality jadi 90%
- Product images lebih penting daripada gallery images dalam hal kualitas

---

## 📞 Troubleshooting

**Q: Gambar jadi blur setelah kompresi?**  
A: Naikan quality setting ke 90% atau 95%

**Q: File size masih terlalu besar?**  
A: Resize dimensions dulu sebelum compress (contoh: 3000px → 1200px)

**Q: Website masih lambat setelah compress?**  
A: Check di Chrome DevTools → Network tab, cari file yang paling besar

**Q: WebP tidak muncul di browser lama?**  
A: Pakai `<picture>` tag dengan fallback JPG

---

📅 **Last Updated**: Mei 2024  
👨‍💻 **Author**: VELIXIER Development Team
