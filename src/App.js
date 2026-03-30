import { useState, useEffect, useRef } from "react";
/* ── GOOGLE FONTS ── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0
document.head.appendChild(fontLink);
/* ── ANIMATIONS + RESPONSIVE CSS ── */
const styleEl = document.createElement("style");
styleEl.textContent = `
@keyframes wcx-fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:t
@keyframes wcx-wordIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:t
@keyframes wcx-float { 0%,100%{transform:translateY(0) rotate(0deg)} 33%{transform:transla
@keyframes wcx-floatS { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
@keyframes wcx-pulse { 0%,100%{opacity:.06} 50%{opacity:.12} }
.wcx-page { animation: wcx-fadeIn 0.5s cubic-bezier(0.16,1,0.3,1) both; }
.wcx-word { display:inline-block; opacity:0; animation:wcx-wordIn 0.6s cubic-bezier(0.16,1,
/* ── MOBILE NAV ── */
.wcx-nav-links { display:flex; align-items:center; gap:0.25rem; }
.wcx-hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:8px;
.wcx-hamburger span { display:block; width:24px; height:2px; background:#374151; border-rad
.wcx-mobile-menu { display:none; }
@media (max-width: 768px) {
.wcx-nav-links { display:none !important; }
.wcx-hamburger { display:flex !important; }
.wcx-mobile-menu {
display:flex;
flex-direction:column;
position:fixed;
top:68px; left:0; right:0;
background:rgba(255,255,255,0.98);
backdrop-filter:blur(20px);
padding:1rem 1.5rem 1.5rem;
gap:0.5rem;
box-shadow:0 8px 32px rgba(10,22,40,0.1);
z-index:49;
animation: wcx-fadeIn 0.2s ease both;
}
.wcx-mobile-menu.wcx-hidden { display:none !important; }
.wcx-grid-2 { grid-template-columns: 1fr !important; }
.wcx-grid-4 { grid-template-columns: 1fr 1fr !important; }
.wcx-how-grid { grid-template-columns: 1fr 1fr !important; }
.wcx-hero-pad { padding-top:7rem !important; padding-bottom:5rem !important; }
.wcx-section-pad { padding:3rem 1.25rem !important; }
.wcx-h1-hero { font-size:2.2rem !important; }
.wcx-team-grid { grid-template-columns: 1fr !important; }
.wcx-contact-grid { grid-template-columns: 1fr !important; }
.wcx-form-row { grid-template-columns: 1fr !important; }
.wcx-stat-grid { grid-template-columns: 1fr 1fr !important; }
.wcx-service-map-table { font-size:0.78rem !important; }
.wcx-footer-grid { grid-template-columns: 1fr !important; }
.wcx-values-grid { grid-template-columns: 1fr !important; }
.wcx-about-stats { grid-template-columns: 1fr 1fr !important; }
}
`;
document.head.appendChild(styleEl);
const C={navy:"#0A1628",navy2:"#162340",org:"#F97316",orgBg:"rgba(249,115,22,0.10)",white:"#f
const F={fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif"};
const inner={maxWidth:1200,margin:"0 auto"};
const tag={display:"inline-block",fontSize:"0.72rem",fontWeight:800,letterSpacing:"0.13em",te
const h2s={...F,fontWeight:800,fontSize:"clamp(1.6rem,3vw,2.4rem)",color:C.navy,letterSpacing
const btnO={background:C.org,color:"#fff",...F,fontWeight:700,fontSize:"1rem",padding:"0.9rem
const btnL={background:"transparent",color:"#fff",...F,fontWeight:700,fontSize:"1rem",padding
const useInView=(t=.08)=>{const r=useRef(null);const[v,sv]=useState(false);useEffect(()=>{con
const useCounter=(target,vis,dur=1800)=>{const[val,sv]=useState(0);useEffect(()=>{if(!vis)ret
const fade=(v,d=0)=>({opacity:v?1:0,transform:v?"translateY(0)":"translateY(28px)",transition
const slideIn=(v,d=0,dir="left")=>({opacity:v?1:0,transform:v?"translateX(0)":`translateX(${d
const Ico=({d,size=22,color="currentColor"})=>{if(!d)return null;return(<svg width={size} hei
const IC={target:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-6a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm
const AnimWords=({text,style,delay=0})=>{const words=text.split(" ");return(<span style={styl
const Navbar=({page,setPage})=>{
const[sc,setSc]=useState(false);
const[menuOpen,setMenuOpen]=useState(false);
useEffect(()=>{const f=()=>setSc(window.scrollY>40);window.addEventListener("scroll",f);ret
const links=[{label:"Ana Sayfa",id:"home"},{label:"Hizmetlerimiz",id:"services"},{label:"Ha
const go=(id)=>{setPage(id);setMenuOpen(false);window.scrollTo({top:0,behavior:"smooth"});}
return(
<>
<header style={{position:"fixed",top:0,left:0,right:0,zIndex:50,background:sc?"rgba(255
<div style={{...inner,padding:"0 1.25rem",height:68,display:"flex",alignItems:"center
<span onClick={()=>go("home")} style={{...F,fontWeight:900,fontSize:"1.5rem",letter
{/* Desktop Nav */}
<nav className="wcx-nav-links">
{links.map(({label,id})=>(<span key={id} onClick={()=>go(id)} style={{...F,fontSi
<span onClick={()=>go("contact")} style={{...F,background:C.org,color:"#fff",font
</nav>
{/* Hamburger */}
<button className="wcx-hamburger" onClick={()=>setMenuOpen(o=>!o)} aria-label="Menü
{menuOpen
? <><span style={{transform:"rotate(45deg) translate(5px,5px)"}}/><span style={
: <><span/><span/><span/></>}
</button>
</div>
</header>
{/* Mobile Menu */}
<div className={`wcx-mobile-menu${menuOpen?"":" wcx-hidden"}`}>
{links.map(({label,id})=>(<span key={id} onClick={()=>go(id)} style={{...F,fontSize:"
<span onClick={()=>go("contact")} style={{...F,background:C.org,color:"#fff",fontWeig
</div>
</>
);
};
const Footer=({setPage})=>{const go=(id)=>{setPage(id);window.scrollTo({top:0,behavior:"smoot
const HowItWorks=()=>{const[ref,vis]=useInView();const steps=[{num:"01",icon:"target",title:"
const ServiceMap=()=>{const[ref,vis]=useInView();const items=[{title:"Grup Dersleri",onsite:t
const StatCounter=({value,suffix,label,source,delay})=>{const[ref,vis]=useInView();const coun
const SVC_DETAILS={"Grup Dersleri":{problem:"Çalışanlarınız spor yapmak istiyor ama iş çıkışı
const ServiceDetailPage=({service,onBack,setPage})=>{
const[rH,vH]=useInView();
if(!service||!service.title)return(<div style={{padding:"8rem 2rem",textAlign:"center"}}><b
const d=SVC_DETAILS[service.title]||{problem:"",what:"",lessons:null,scope:null};
return(<div className="wcx-page"><section className="wcx-hero-pad wcx-section-pad" style={{
};
const HomePage=({setPage})=>{const[rS,vS]=useInView();const[rE,vE]=useInView();const[rW,vW]=u
const ServicesPage=({setPage})=>{const[rH,vH]=useInView();const[rS,vS]=useInView();const[rM,v
const AboutPage=({setPage})=>{const[rH,vH]=useInView();const[rS,vS]=useInView();const[rT,vT]=
const ContactPage=()=>{
const[rH,vH]=useInView();
const[rM,vM]=useInView();
const[form,setForm]=useState({name:"",email:"",company:"",message:""});
const[sent,setSent]=useState(false);
const[sending,setSending]=useState(false);
const handleSubmit=async(e)=>{
e.preventDefault();
setSending(true);
try{
const res=await fetch("https://formspree.io/f/xykbwpjp",{
method:"POST",
headers:{"Content-Type":"application/json","Accept":"application/json"},
body:JSON.stringify(form)
});
if(res.ok)setSent(true);
else alert("Bir hata oluştu, lütfen tekrar deneyin.");
}catch{
alert("Bağlantı hatası, lütfen tekrar deneyin.");
}finally{
setSending(false);
}
};
const inp={width:"100%",padding:"0.85rem 1rem",borderRadius:9,border:`1.5px solid ${C.gray2
return(<div className="wcx-page"><section className="wcx-hero-pad wcx-section-pad" style={{
};
export default function WcorpX(){
const[page,setPage]=useState("home");
useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"});},[page]);
return(
<div style={{...F,background:C.white,color:C.navy,minHeight:"100vh"}}>
<Navbar page={page} setPage={setPage}/>
<main>
{page==="home"&&<HomePage setPage={setPage}/>}
{page==="services"&&<ServicesPage setPage={setPage}/>}
{page==="about"&&<AboutPage setPage={setPage}/>}
{page==="contact"&&<ContactPage/>}
</main>
<Footer setPage={setPage}/>
</div>
);
}
