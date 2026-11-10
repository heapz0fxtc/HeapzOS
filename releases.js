fetch('https://api.github.com/repos/heapz0fxtc/HeapzOS/releases?per_page=100')
.then(r=>r.json()).then(list=>{
 const el=document.getElementById('rel-list');
 if(!Array.isArray(list)||!list.length){el.innerHTML='<p>No releases yet.</p>';document.getElementById('dl-pre').innerHTML='<p class="muted">No releases yet.</p>';return}
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const L=list[0];document.getElementById('latest').innerHTML='Latest: <b>'+esc(L.name||L.tag_name)+'</b>';
 const isPre=r=>/pre/i.test(r.tag_name)||/pane/i.test(r.name||'');
 const row=r=>{const a=(r.assets||[])[0];return `<div class="dlrow"><span>${esc(r.name||r.tag_name)}</span><a class="get" href="${a?a.browser_download_url:r.html_url}" target="_blank" rel="noopener">${a?'⬇ Download':'View'}</a></div>`};
 const pre=list.filter(isPre),beta=list.filter(r=>!isPre(r));
 document.getElementById('dl-pre').innerHTML=pre.length?pre.map(row).join(''):'<p class="muted">None yet.</p>';
 if(beta.length)document.getElementById('dl-beta').innerHTML=beta.map(row).join('');
 el.innerHTML=list.map(r=>{
  const d=new Date(r.published_at).toLocaleDateString();
  const body=esc((r.body||'').replace(/\r/g,'').replace(/\n{2,}/g,'\n'));
  return `<article class="release"><h3><a href="${r.html_url}" target="_blank" rel="noopener">${esc(r.name||r.tag_name)}</a><span class="badge">${isPre(r)?'Pre-build':'Beta'}</span> <span class="date">${d}</span></h3><details><summary>Read release notes</summary><div class="body">${body}</div></details></article>`}).join('');
}).catch(()=>{document.getElementById('rel-list').innerHTML='<p>See all notes on <a href="https://github.com/heapz0fxtc/HeapzOS/releases">GitHub</a>.</p>'});
