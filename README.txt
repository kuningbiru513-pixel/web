CHERING LINK - versi integrasi Google Drive

CARA PAKAI
1. Pastikan Google Apps Script berisi kode backend upload/list yang diberikan di percakapan.
2. Deploy > Manage deployments > Edit (pensil) > New version > Deploy. Akses: Anyone/Siapa saja, eksekusi sebagai akun Anda.
3. URL Apps Script yang dipasang di assets/app.js saat ini:
https://script.google.com/macros/s/AKfycbxb-t1ynLs_ZJM_fCf1QK7BdSrNEKpNfpQ1x3DGUrOTFq0G6ktCGihIbAixfSF__Y6Z/exec
4. Upload ZIP ini ke Netlify Drop atau ekstrak lalu unggah isi folder ihsan ke Netlify.
5. Buka website, pilih Admin. Login demo: admin / admin123. Ganti login demo sebelum website dipakai publik; login ini bukan keamanan sungguhan.
6. Upload video MP4/WebM/MOV maksimal 4 MB, tunggu, lalu cek daftar video.

CATATAN PENTING
- Upload melalui Apps Script ini prototipe dan memiliki batas ukuran ketat. Video besar perlu backend penyimpanan yang lebih sesuai.
- Endpoint Apps Script publik dapat disalahgunakan oleh orang lain. Jangan sebarkan luas sebelum menambahkan autentikasi server-side.
- Jika upload gagal, buka Apps Script > Executions untuk melihat error, pastikan izin Google Drive sudah diberikan dan deployment diperbarui.
- Berkas video disimpan di Google Drive milik akun yang menjalankan Apps Script.
