/* Lead form + contact links. Set ZL.formEndpoint in config.js (Formspree URL, webhook, etc.). Empty = opens email app. */
(function(){
  const C=window.ZL;
  document.querySelectorAll("[data-zl]").forEach(a=>{const k=a.dataset.zl;
    if(k==="email")a.href="mailto:"+C.email;
    else if(k==="phone"&&C.phone)a.href="tel:"+C.phone.replace(/\s/g,"");
    else if(k==="whatsapp"&&C.whatsapp)a.href="https://wa.me/"+C.whatsapp+"?text="+encodeURIComponent(C.whatsappMessage);
    else a.style.display="none";});
  const f=document.getElementById("lead-form");if(!f)return;
  const msg=f.querySelector(".form-msg");
  f.addEventListener("submit",async e=>{e.preventDefault();
    if(f.website_hp&&f.website_hp.value)return;
    if(!f.checkValidity()){msg.className="form-msg err";msg.textContent="Please fill the required fields with valid details.";f.reportValidity();return}
    const d=Object.fromEntries(new FormData(f));delete d.website_hp;
    if(C.formEndpoint){
      try{const r=await fetch(C.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(d)});
        if(!r.ok)throw 0;f.reset();msg.className="form-msg ok";msg.textContent="Thanks. We'll reply within one working day."}
      catch(_){msg.className="form-msg err";msg.textContent="Could not send. Please email "+C.email+" instead."}
    }else{
      const body=Object.entries(d).map(([k,v])=>k+": "+v).join("\n");
      location.href="mailto:"+C.email+"?subject="+encodeURIComponent("New enquiry from "+d.name)+"&body="+encodeURIComponent(body);
      msg.className="form-msg ok";msg.textContent="Opening your email app. If nothing opens, write to "+C.email+".";
    }});
})();