# 🚀 VELIXIER - Panduan Deploy ke Vercel

## 📋 Prerequisites
- Account Vercel (gratis): https://vercel.com/signup
- Git repository (GitHub, GitLab, atau Bitbucket)
- Node.js terinstall di komputer

---

## 🎯 Langkah Deploy ke Vercel

### **Option 1: Deploy via Vercel Dashboard (PALING MUDAH)**

1. **Push ke GitHub/GitLab**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Login ke Vercel**
   - Buka https://vercel.com/
   - Sign up/Login dengan GitHub account

3. **Import Project**
   - Klik "Add New Project"
   - Import repository `Web-Design`
   - Vercel akan auto-detect Vue.js project

4. **Configure Build Settings**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   
   ✅ Settings ini sudah otomatis di `vercel.json`!

5. **Environment Variables** (Jika pakai EmailJS)
   - Klik "Environment Variables"
   - Tambahkan:
     ```
     VITE_EMAILJS_SERVICE_ID = your_service_id
     VITE_EMAILJS_TEMPLATE_ID = your_template_id
     VITE_EMAILJS_PUBLIC_KEY = your_public_key
     ```

6. **Deploy!**
   - Klik "Deploy"
   - Tunggu 2-3 menit
   - Selesai! 🎉

---

### **Option 2: Deploy via Vercel CLI**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login ke Vercel
vercel login

# 3. Deploy (dari root folder project)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (pilih account Anda)
# - Link to existing project? No
# - What's your project's name? velixier
# - In which directory is your code located? ./
# - Want to override settings? No

# 4. Deploy to production
vercel --prod
```

---

## ✅ Setelah Deploy

### **Your website akan live di:**
```
https://velixier.vercel.app
```
atau custom domain yang Anda pilih.

### **Auto Deploy**
✅ Setiap push ke `main` branch akan auto-deploy!
```bash
git add .
git commit -m "Update website"
git push origin main
# Vercel akan otomatis rebuild & deploy
```

---

## 🔧 Troubleshooting

### **Build Error: "Cannot find module"**
```bash
# Pastikan dependencies terinstall
npm install
npm run build
```

### **Images tidak muncul**
✅ Sudah fix! Semua gambar di `/src/assets/` akan otomatis di-bundle.

### **Routing 404 Error**
✅ Sudah fix di `vercel.json` dengan SPA fallback routing!

---

## 📊 Performance & SEO

✅ **SEO Meta Tags** - Sudah configured di `index.html`
✅ **Favicon** - Custom SVG favicon dengan logo "V" gold
✅ **Cache Headers** - Optimized di `vercel.json`
✅ **Security Headers** - XSS protection, frame options
✅ **Build Optimization** - Code splitting & lazy loading

---

## 🎨 Custom Domain (Opsional)

1. Beli domain (Namecheap, GoDaddy, dll)
2. Di Vercel Dashboard:
   - Settings → Domains
   - Add Custom Domain
   - Follow DNS configuration
3. Vercel akan auto-generate SSL certificate (HTTPS gratis!)

---

## 📝 Notes

- **Build Time**: ~2-3 menit
- **Free Tier**: 100 GB bandwidth/bulan (cukup untuk ribuan visitor!)
- **Auto HTTPS**: Gratis SSL certificate
- **CDN**: Content delivered dari edge servers terdekat (cepat!)

---

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/guide/
- Vue.js Docs: https://vuejs.org/guide/

**Selamat! Website Velixier siap go live! 🚀**
