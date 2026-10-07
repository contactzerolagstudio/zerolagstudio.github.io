/* Zerolagstudio central config — edit values here, they update across the site. */
window.ZL = {
  brandName: "Zerolagstudio",
  email: "contact.zerolagstudio@gmail.com",
  phone: "",                 // e.g. "+91 00000 00000"
  whatsapp: "",              // digits only with country code, e.g. "919876543210"
  whatsappMessage: "Hi Zerolagstudio, I want to discuss marketing services for my business.",
  instagram: "", linkedin: "", facebook: "", youtube: "",   // full profile URLs
  address: "", website: "https://zerolagstudio.github.io",
  analyticsId: "",           // GA4 ID, e.g. "G-XXXXXXXXXX" (loaded only if set)
  // Hero stats — placeholders, replace with real numbers
  stats: [
    { value: 100, suffix: "+", label: "Campaigns & Projects" },
    { value: 50,  suffix: "+", label: "Brands Supported" },
    { value: 10,  suffix: "+", label: "Industries" },
    { value: 360, suffix: "°", label: "Digital Growth" }
  ],
  // Lead form endpoint (Formspree / webhook / EmailJS). Empty = mailto fallback.
  formEndpoint: ""
};
