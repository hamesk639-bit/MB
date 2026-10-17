const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];const whatsapp='https://wa.me/201068222596?text='+encodeURIComponent('Hello, I visited your portfolio and would like to discuss a potential project or professional opportunity.');
$('#year').textContent=new Date().getFullYear();const themeButton=$('#themeToggle');function updateThemeIcon(){const dark=document.documentElement.dataset.theme==='dark';$('#themeIcon').textContent=dark?'☀':'☾';themeButton.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode')}updateThemeIcon();themeButton.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('mb-theme',next)}catch(e){}updateThemeIcon()});
const menu=$('#menuToggle'),links=$('#navLinks');menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕':'☰'});$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));function onScroll(){const max=document.documentElement.scrollHeight-innerHeight;$('#progress').style.width=(max>0?scrollY/max*100:0)+'%';$('#header').classList.toggle('scrolled',scrollY>15)}addEventListener('scroll',onScroll,{passive:true});onScroll();
if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.09});$$('.reveal').forEach(el=>io.observe(el));const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){$$('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-25% 0px -65% 0px'});$$('main section[id]').forEach(el=>navObserver.observe(el))}else{$$('.reveal').forEach(el=>el.classList.add('visible'))}
$$('.filter').forEach(b=>b.addEventListener('click',()=>{$$('.filter').forEach(f=>{f.classList.toggle('active',f===b);f.setAttribute('aria-pressed',String(f===b))});$$('.project-card').forEach(c=>{c.hidden=b.dataset.filter!=='all'&&c.dataset.category!==b.dataset.filter})}));
const projects={foundation:{title:'Ground Beam Reinforcement',category:'GROUND BEAM DETAILS',images:['foundation-1.webp','foundation-2.webp','foundation-3.webp'],alts:['Ground beam key plan','Ground beam reinforcement sections and bar details, sheet one','Ground beam reinforcement sections and bar details, sheet two']},columns:{title:'Column Layout & Reinforcement Details',category:'FIRST FLOOR STRUCTURAL DRAWINGS',images:['columns-1.webp','columns-2.webp','columns-3.webp','columns-4.webp'],alts:['First-floor column grid and axes','Column reinforcement details sheet one','Column reinforcement details sheet two','Column reinforcement details sheet three']},footings:{title:'Footing & Raft Reinforcement Details',category:'FOUNDATION REINFORCEMENT DRAWINGS',images:['footings-1.webp','footings-2.webp','footings-3.webp','footings-4.webp','footings-5.webp','footings-6.webp','footings-7.webp','footings-8.webp'],alts:['Foundation reinforcement sheet 1','Foundation reinforcement sheet 2','Foundation reinforcement sheet 3','Foundation reinforcement sheet 4','Foundation reinforcement sheet 5','Foundation reinforcement sheet 6','Foundation reinforcement sheet 7','Foundation reinforcement sheet 8']}};let current=null,index=0,lastFocus=null;const modal=$('#lightbox'),image=$('#viewerImage');function show(){const p=projects[current];$('#viewerTitle').textContent=p.title;$('#viewerCategory').textContent=p.category;image.src='assets/'+p.images[index];image.alt=p.alts[index];image.classList.remove('zoomed');$('#viewerCount').textContent=String(index+1).padStart(2,'0')+' / '+String(p.images.length).padStart(2,'0');$('#zoomButton').textContent='Zoom +'}function openProject(key){lastFocus=document.activeElement;current=key;index=0;show();modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('#viewerClose').focus()}function closeProject(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';image.src='';if(lastFocus)lastFocus.focus()}function move(n){if(!current)return;index=(index+n+projects[current].images.length)%projects[current].images.length;show()}$$('[data-project]').forEach(el=>el.addEventListener('click',()=>openProject(el.dataset.project)));$('#viewerClose').addEventListener('click',closeProject);$('#viewerPrev').addEventListener('click',()=>move(-1));$('#viewerNext').addEventListener('click',()=>move(1));function zoom(){image.classList.toggle('zoomed');$('#zoomButton').textContent=image.classList.contains('zoomed')?'Fit image':'Zoom +'}image.addEventListener('click',zoom);$('#zoomButton').addEventListener('click',zoom);modal.addEventListener('click',e=>{if(e.target===modal)closeProject()});document.addEventListener('keydown',e=>{if(!modal.classList.contains('open'))return;if(e.key==='Escape')closeProject();if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1);if(e.key==='Tab'){const controls=$$('#lightbox button');const first=controls[0],last=controls[controls.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function applyRevealStagger(){
  const groups=['.expertise-card','.project-card','.step','.job','.tool-list > div','.section-top','.section-heading','.about-content'];
  groups.forEach(selector=>{
    $$(selector).forEach((el,i)=>{
      if(!el.classList.contains('reveal')) el.classList.add('reveal');
      el.style.setProperty('--reveal-delay',`${Math.min(i,5)*70}ms`);
    });
  });
}
applyRevealStagger();
if('IntersectionObserver' in window){
  const extraRevealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      extraRevealObserver.unobserve(entry.target);
    }
  }),{threshold:.09});
  $$('.reveal').forEach(el=>{
    if(!el.classList.contains('visible')) extraRevealObserver.observe(el);
  });
}else{
  $$('.reveal').forEach(el=>el.classList.add('visible'));
}
function setupHeroMotion(){
  if(prefersReducedMotion) return;
  const hero=$('#home');
  if(!hero) return;
  let ticking=false;
  const update=()=>{
    const y=window.scrollY||0;
    const limit=Math.max(hero.offsetHeight,1);
    const progress=Math.min(y/limit,1);
    document.documentElement.style.setProperty('--hero-copy-shift',`${y*-0.035}px`);
    document.documentElement.style.setProperty('--hero-visual-shift',`${y*0.05}px`);
    document.documentElement.style.setProperty('--hero-bottom-shift',`${y*0.02}px`);
    document.documentElement.style.setProperty('--hero-bottom-opacity',`${1-progress*0.45}`);
    ticking=false;
  };
  update();
  window.addEventListener('scroll',()=>{
    if(ticking) return;
    ticking=true;
    window.requestAnimationFrame(update);
  },{passive:true});
}
setupHeroMotion();
