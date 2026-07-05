# Web Ultah Static

Project ini dibuat supaya alurnya tetap mirip `MEILANI.html`, tetapi lebih rapi untuk diedit dan langsung di-deploy ke Vercel.

## Struktur

- `index.html`: struktur halaman dan urutan step
- `style.css`: desain dan animasi
- `script.js`: isi teks, nama, galeri, dan interaksi
- `assets/photos/`: foto galeri
- `assets/videos/`: video utama
- `assets/audio/`: musik latar opsional

## File yang perlu kamu ganti

1. Buka `script.js`, lalu ubah:
   - `celebrantName`
   - `senderName`
   - `heroMessage`
   - `closingMessage`
   - `whatsappNumber`
2. Taruh file foto di:
   - `assets/photos/photo-1.jpg`
   - `assets/photos/photo-2.jpg`
   - `assets/photos/photo-3.jpg`
   - `assets/photos/photo-4.jpg`
   - `assets/photos/photo-5.jpg`
   - `assets/photos/photo-6.jpg`
3. Taruh video di:
   - `assets/videos/birthday-video.mp4`
4. Kalau mau musik latar, taruh file MP3 di:
   - `assets/audio/song.mp3`

## Deploy ke Vercel

1. Upload folder ini ke GitHub atau drag-and-drop ke Vercel.
2. Framework preset pilih `Other`.
3. Build command kosongkan.
4. Output directory kosongkan juga karena ini static site biasa.

Kalau file foto, video, atau audio belum ada, halaman tetap jalan dan akan menampilkan placeholder.
