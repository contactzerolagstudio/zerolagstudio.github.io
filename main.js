/* Shared header/footer, animations and interactions. Set <body data-root=""> ("../" inside subfolders). */
(function(){
  const C=window.ZL,R=document.body.dataset.root||"";
  const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
  const links=[["Services","services.html"],["Expertise","expertise.html"],["Industries","industries.html"],["Work","portfolio.html"],["About","about.html"],["Blog","blog.html"]];
  const here=location.pathname.split("/").pop()||"index.html";
  const nav=links.map(l=>`<a href="${R}${l[1]}"${here===l[1]?' class="active"':""}>${l[0]}</a>`).join("");
  const mob=[["Home","index.html"],...links,["Contact","contact.html"]].map(l=>`<a href="${R}${l[1]}">${l[0]}</a>`).join("");
  const li=a=>a.map(x=>`<li><a href="${R}${x[1]}">${x[0]}</a></li>`).join("");
  document.getElementById("site-header").outerHTML=`
  <header class="hdr" id="hdr"><div class="wrap">
    <a class="logo" href="${R}index.html" aria-label="${C.brandName} home">ZEROLAG<b>STUDIO</b></a>
    <nav class="nav" aria-label="Main">${nav}</nav>
    <a class="btn" href="${R}contact.html">Let's Talk <span class="ar">→</span></a>
    <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
  </div></header>
  <div class="menu" id="menu" aria-hidden="true">${mob}<a class="btn" href="${R}contact.html">Start a Project <span class="ar">→</span></a></div>`;
  document.getElementById("site-footer").outerHTML=`
  <footer class="ftr"><div class="wrap">
    <div class="big">ZEROLAG<span class="accent">STUDIO</span></div>
    <p style="font-size:22px;margin-bottom:40px">Marketing without the lag. <a class="accent" href="${R}contact.html">Start a Project →</a></p>
    <div class="cols">
      <div><h4>Agency</h4><ul>${li([["About","about.html"],["Work","portfolio.html"],["Expertise","expertise.html"],["Industries","industries.html"],["Contact","contact.html"]])}</ul></div>
      <div><h4>Services</h4><ul>${li([["Meta Ads","services/meta-ads.html"],["Google Ads","services/google-ads.html"],["SEO","services/seo.html"],["Social Media","services/social-media-marketing.html"],["Web Development","services/website-development.html"],["Branding","services/branding.html"]])}</ul></div>
      <div><h4>Resources</h4><ul>${li([["Blog","blog.html"],["Pricing","pricing.html"]])}</ul></div>
      <div><h4>Connect</h4><ul><li><a href="mailto:${C.email}">${C.email}</a></li>${["instagram","linkedin","facebook","youtube"].filter(s=>C[s]).map(s=>`<li><a href="${C[s]}" rel="noopener" target="_blank">${s[0].toUpperCase()+s.slice(1)}</a></li>`).join("")}</ul></div>
    </div>
    <p class="base">© 2026 ${C.brandName}. All rights reserved.</p>
  </div></footer>`;
  if(C.whatsapp){const a=document.createElement("a");a.className="wa";a.textContent="Chat on WhatsApp";a.target="_blank";a.rel="noopener";a.href=`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(C.whatsappMessage)}`;document.body.appendChild(a)}
  const hdr=document.getElementById("hdr"),b=document.getElementById("burger"),m=document.getElementById("menu");
  const onS=()=>hdr.classList.toggle("scrolled",scrollY>30);onS();addEventListener("scroll",onS,{passive:true});
  b.onclick=()=>{const o=m.classList.toggle("open");b.setAttribute("aria-expanded",o);m.setAttribute("aria-hidden",!o);document.body.style.overflow=o?"hidden":""};
  m.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{if(m.classList.contains("open"))b.click()}));
  if(C.analyticsId){const s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+C.analyticsId;document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",C.analyticsId)}
  /* Meta Pixel / GTM / Google Ads conversion: paste snippets here once IDs exist. */
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("on");io.unobserve(e.target)}}),{threshold:.15});
  document.querySelectorAll(".rv").forEach(el=>io.observe(el));
  document.querySelectorAll("[data-words]").forEach(el=>{
    el.innerHTML=el.textContent.split(" ").map(w=>`<span class="w">${w}</span>`).join(" ");
    const ws=el.querySelectorAll(".w");
    const wio=new IntersectionObserver(es=>{if(es[0].isIntersecting){ws.forEach((w,i)=>setTimeout(()=>w.classList.add("on"),reduce?0:i*90));wio.disconnect()}},{threshold:.3});wio.observe(el)});
  const sg=document.getElementById("stats-grid");
  if(sg){sg.innerHTML=C.stats.map(s=>`<div class="stat"><b data-to="${s.value}" data-suf="${s.suffix}">${s.value}${s.suffix}</b><span>${s.label}</span></div>`).join("");
    const cio=new IntersectionObserver(es=>{if(!es[0].isIntersecting)return;cio.disconnect();
      sg.querySelectorAll("b").forEach(n=>{const t=+n.dataset.to,t0=performance.now(),d=reduce?1:1600;
        (function f(now){const p=Math.min((now-t0)/d,1);n.textContent=Math.round(t*(1-Math.pow(1-p,3)))+n.dataset.suf;if(p<1)requestAnimationFrame(f)})(t0)})},{threshold:.4});cio.observe(sg)}
  const prev=document.getElementById("svc-prev");
  if(prev)document.querySelectorAll(".svc-list a").forEach(a=>{const set=()=>{document.querySelectorAll(".svc-list a").forEach(x=>x.classList.remove("on"));a.classList.add("on");
    const cap=prev.querySelector(".cap");cap.style.opacity=0;setTimeout(()=>{prev.querySelector("h3").textContent=a.dataset.t;prev.querySelector("p").textContent=a.dataset.d;cap.style.opacity=1},160)};
    a.addEventListener("mouseenter",set);a.addEventListener("focus",set)});
  if(matchMedia("(hover:hover) and (pointer:fine)").matches&&!reduce){
    const d=document.createElement("div"),r=document.createElement("div");d.className="cur-dot";r.className="cur-ring";document.body.append(d,r);
    let x=0,y=0,rx=0,ry=0;addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY;d.style.transform=`translate(${x}px,${y}px)`});
    (function l(){rx+=(x-rx)*.15;ry+=(y-ry)*.15;r.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(l)})();
    document.querySelectorAll("a,button").forEach(el=>{el.addEventListener("mouseenter",()=>r.classList.add("big"));el.addEventListener("mouseleave",()=>r.classList.remove("big"))});
    document.querySelectorAll(".btn").forEach(el=>{el.addEventListener("mousemove",e=>{const k=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-k.left-k.width/2)*.2}px,${(e.clientY-k.top-k.height/2)*.3}px)`});el.addEventListener("mouseleave",()=>el.style.transform="")})}
})();
