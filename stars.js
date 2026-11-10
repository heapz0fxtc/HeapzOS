const c=document.getElementById('stars'),x=c.getContext('2d');let s=[];
function r(){c.width=innerWidth;c.height=innerHeight;s=Array.from({length:Math.floor(c.width*c.height/3000)},()=>({x:Math.random()*c.width,y:Math.random()*c.height,z:Math.random()*1.5+.3,t:Math.random()*6}))}
function d(){x.clearRect(0,0,c.width,c.height);for(const p of s){p.t+=.02;p.y+=p.z*.08;if(p.y>c.height)p.y=0;x.globalAlpha=.5+.5*Math.sin(p.t);x.fillStyle='#fff';x.beginPath();x.arc(p.x,p.y,p.z,0,7);x.fill()}requestAnimationFrame(d)}
addEventListener('resize',r);r();d();document.getElementById('y').textContent=new Date().getFullYear();
