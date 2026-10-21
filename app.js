// CHERING LINK: penyimpanan video Google Drive melalui Google Apps Script
const API_URL = 'https://script.google.com/macros/s/AKfycbxb-t1ynLs_ZJM_fCf1QK7BdSrNEKpNfpQ1x3DGUrOTFq0G6ktCGihIbAixfSF__Y6Z/exec';
function htmlSafe(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function dateLabel(timestamp) { return new Date(timestamp).toLocaleDateString('id-ID', {day:'2-digit',month:'short',year:'numeric'}); }
function makeId() { return (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36)+Math.random().toString(36).slice(2)); }
function watchUrl(id) { const u=new URL('watch.html',location.href);u.searchParams.set('id',id);return u.href; }
async function copyValue(value) { try { await navigator.clipboard.writeText(value); alert('Link berhasil disalin.'); } catch { window.prompt('Salin link ini:',value); } }
function listVideos() {
 return new Promise((resolve,reject)=>{
  const cb='cheringCallback_'+Date.now()+'_'+Math.random().toString(36).slice(2);
  const script=document.createElement('script'); const timer=setTimeout(()=>{cleanup();reject(new Error('Waktu tunggu habis. Periksa koneksi dan URL Apps Script.'));},20000);
  function cleanup(){clearTimeout(timer);delete window[cb];script.remove();}
  window[cb]=(result)=>{cleanup();if(!result||!result.success)reject(new Error('Gagal mengambil daftar video.'));else resolve(result.videos||[]);};
  script.onerror=()=>{cleanup();reject(new Error('Tidak bisa terhubung ke Google Apps Script.'));};
  script.src=API_URL+'?action=list&callback='+cb;document.body.appendChild(script);
 });
}
async function uploadVideo(file,title,description) {
 // Base64 upload melalui Apps Script dibatasi; gunakan video kecil (disarankan <= 4 MB).
 if(file.size>4*1024*1024) throw new Error('Ukuran video terlalu besar. Untuk versi ini gunakan video maksimal 4 MB.');
 const base64=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(',')[1]);reader.onerror=()=>reject(new Error('Gagal membaca file video.'));reader.readAsDataURL(file);});
 const payload={action:'upload',id:makeId(),title:title.trim(),description:description.trim(),fileName:file.name,mimeType:file.type||'video/mp4',base64};
 // mode no-cors mengirim permintaan ke Apps Script; browser tidak mengizinkan membaca respons lintas domain.
 await fetch(API_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
 return payload;
}
