/* Expertise accordion (max 2 open) + portfolio filter/modal */
(function(){
  const items=[...document.querySelectorAll(".acc-i")];
  items.forEach(i=>i.querySelector(".acc-h").addEventListener("click",()=>{
    const o=i.classList.toggle("open");i.querySelector(".acc-h").setAttribute("aria-expanded",o);
    const open=items.filter(x=>x.classList.contains("open"));
    if(open.length>2){const old=open.find(x=>x!==i);old.classList.remove("open");old.querySelector(".acc-h").setAttribute("aria-expanded",false)}}));
  const fb=[...document.querySelectorAll(".filters button")],cards=[...document.querySelectorAll(".work")];
  fb.forEach(b=>b.addEventListener("click",()=>{fb.forEach(x=>x.classList.remove("on"));b.classList.add("on");
    cards.forEach(c=>{const show=b.dataset.f==="all"||c.dataset.cat.split(" ").includes(b.dataset.f);
      if(show){c.classList.remove("hide");requestAnimationFrame(()=>{c.style.opacity=0;c.style.transform="translateY(14px)";requestAnimationFrame(()=>{c.style.opacity=1;c.style.transform="none"})})}else c.classList.add("hide")})}));
  const dlg=document.getElementById("case-dlg");
  cards.forEach(c=>c.addEventListener("click",()=>{if(!dlg)return;const d=c.dataset;
    dlg.querySelector("h3").textContent=d.client;dlg.querySelector("dl").innerHTML=["Industry","Challenge","Solution","Services","Result"].map(k=>`<dt>${k}</dt><dd>${d[k.toLowerCase()]}</dd>`).join("");
    dlg.showModal()}));
  if(dlg)dlg.addEventListener("click",e=>{if(e.target===dlg||e.target.closest("[data-close]"))dlg.close()});
})();