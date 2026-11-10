fetch('https://api.github.com/repos/heapz0fxtc/HeapzOS/releases?per_page=100')
.then(r=>r.json()).then(list=>{
 const el=document.getElementById('rel-list');
 if(!Array.isArray(list)||!list.length){el.innerHTML='<p>No releases yet.</p>';return}
 const L=list[0];document.getElementById('latest').innerHTML='Latest: <b>'+(L.name||L.tag_name)+'</b>';
 const a=(L.assets||[])[0];if(a)document.getElementById('dl-latest').href=a.browser_download_url;
 const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 el.innerHTML=list.map(r=>{
  const d=new Date(r.published_at).toLocaleDateString();
  const body=esc((r.body||'').replace(/\r/g,'').replace(/\n{2,}/g,'\n'));
  return `<article class="release"><h3><a href="${r.html_url}" target="_blank" rel="noopener">${esc(r.name||r.tag_name)}</a>${r.prerelease?'<span class="badge">Pre-build</span>':''} <span class="date">${d}</span></h3><details><summary>Read release notes</summary><div class="body">${body}</div></details></article>`}).join('');
}).catch(()=>{document.getElementById('rel-list').innerHTML='<p>See all notes on <a href="https://github.com/heapz0fxtc/HeapzOS/releases">GitHub</a>.</p>'});
