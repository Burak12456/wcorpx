import { useState, useEffect, useRef } from "react";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900&display=swap";
document.head.appendChild(fontLink);

const styleEl = document.createElement("style");
styleEl.textContent = `
@keyframes wcx-fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
@keyframes wcx-wordIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes wcx-float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(3deg)} }
@keyframes wcx-floatS { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
@keyframes wcx-pulse { 0%,100%{opacity:.06} 50%{opacity:.12} }
.wcx-page { animation: wcx-fadeIn 0.5s cubic-bezier(0.16,1,0.3,1) both; }
.wcx-word { display:inline-block; opacity:0; animation: wcx-wordIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards; }
.wcx-geo1 { animation: wcx-float 7s ease-in-out infinite; }
.wcx-geo2 { animation: wcx-floatS 9s ease-in-out infinite 1s; }
.wcx-geo3 { animation: wcx-pulse 4s ease-in-out infinite; }
`;
document.head.appendChild(styleEl);

const C = {
  navy: "#0A1628", navy2: "#162340", org: "#F97316",
  orgBg: "rgba(249,115,22,0.10)", orgBorder: "rgba(249,115,22,0.22)",
  white: "#ffffff", gray50: "#F8FAFC", gray100: "#F1F5F9",
  gray200: "#E2E8F0", gray500: "#6B7280", gray700: "#374151",
};

const F = { fontFamily: "\'Plus Jakarta Sans\', system-ui, sans-serif" };
const inner = { maxWidth: 1200, margin: "0 auto" };
const tag = { display:"inline-block", fontSize:"0.72rem", fontWeight:800, letterSpacing:"0.13em", textTransform:"uppercase", color:C.org, marginBottom:8 };
const h2s = { ...F, fontWeight:800, fontSize:"clamp(1.6rem,3vw,2.4rem)", color:C.navy, letterSpacing:"-0.02em", marginBottom:12 };
const btnO = { background:C.org, color:"#fff", ...F, fontWeight:700, fontSize:"1rem", padding:"0.9rem 2rem", borderRadius:9, border:"none", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:8, transition:"all 0.2s", boxShadow:"0 4px 16px rgba(249,115,22,0.30)" };
const btnOL = { background:"transparent", color:C.navy, ...F, fontWeight:700, fontSize:"1rem", padding:"0.875rem 2rem", borderRadius:9, border:"2px solid "+C.navy, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:8, transition:"all 0.2s" };

const useInView = () => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, vis];
};

const useCounter = (target, vis, duration = 1800) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!vis) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [vis, target]);
  return count;
};

const fade = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? "translateY(0)" : "translateY(32px)",
  transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

const slideIn = (vis, delay = 0, dir = "left") => ({
  opacity: vis ? 1 : 0,
  transform: vis ? "translateX(0)" : `translateX(${dir === "left" ? "-40px" : "40px"})`,
  transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

const IC = {
  target:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-6a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4",
  zap:"M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  award:"M12 15l-4.243 4.243 1.06-5.656L4.03 9.757l5.699-.828L12 4l2.271 4.929 5.699.828-4.787 3.83 1.06 5.656L12 15z",
  users:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  star:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  wind:"M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2",
  coffee:"M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3",
  monitor:"M20 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8 21h8M12 17v4",
  sun:"M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  check:"M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  chart:"M18 20V10M12 20V4M6 20v-6",
  shield:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  arrow:"M5 12h14M12 5l7 7-7 7",
  chevron:"M9 18l6-6-6-6",
  menu:"M3 12h18M3 6h18M3 18h18",
  x:"M18 6 6 18M6 6l12 12",
  activity:"M22 12h-4l-3 9L9 3l-3 9H2",
  mail:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  instagram:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z",
  linkedin:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  send:"M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  video:"M23 7l-7 5 7 5V7zM1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z",
  building:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  heart:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  trophy:"M8 21h8M12 17v4M7 4H4v5a8 8 0 0 0 8 8 8 8 0 0 0 8-8V4h-3M5 8h14",
  mappin:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  wifi:"M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01",
};

const Ico = ({ d, size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const AnimWords = ({ text, baseDelay = 0.1, color }) => (
  <>
    {text.split(" ").map((word, i) => (
      <span key={i} className="wcx-word" style={{ animationDelay: `${baseDelay + i * 0.12}s`, color: color || "inherit", marginRight: "0.28em" }}>
        {word}
      </span>
    ))}
  </>
);

const StatCounter = ({ value, prefix = "", suffix = "", label, sub, vis, delay = 0 }) => {
  const count = useCounter(value, vis);
  return (
    <div
      style={{ ...fade(vis, delay), background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "2rem 1.5rem", textAlign: "center", transition: "background 0.2s", cursor: "default" }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
    >
      <div style={{ ...F, fontWeight: 900, fontSize: "clamp(2rem,4vw,2.8rem)", color: C.org, letterSpacing: "-0.03em", lineHeight: 1 }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#fff", marginTop: "0.5rem" }}>{label}</div>
      <div style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.40)", marginTop: "0.3rem" }}>{sub}</div>
    </div>
  );
};

const HowItWorks = ({ vis }) => {
  const steps = [
    { num: "01", icon: "target", title: "Keşif Görüşmesi",  sub: "Şirketi tanıyoruz" },
    { num: "02", icon: "zap",    title: "Program Tasarımı", sub: "Size özel plan" },
    { num: "03", icon: "award",  title: "Sahada Uygulama",  sub: "Ekibimiz gelir" },
    { num: "04", icon: "chart",  title: "Takip & Rapor",    sub: "Sonuçlar ölçülür" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, padding: "3rem 2rem", position: "relative" }}>
      {steps.map(({ num, icon, title, sub }, i) => (
        <div key={title} style={{ ...fade(vis, i * 0.2), display: "flex", flexDirection: "column", alignItems: "center", position: "relative", padding: "0 1rem" }}>
          {i < 3 && (
            <div style={{ position: "absolute", top: 28, left: "calc(50% + 32px)", right: "calc(-50% + 32px)", height: 2, background: "linear-gradient(to right,"+C.org+",rgba(249,115,22,0.15))" }} />
          )}
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.org, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative", zIndex: 1, boxShadow: "0 4px 16px rgba(249,115,22,0.4)" }}>
            <Ico d={IC[icon]} size={22} color="#fff" />
          </div>
          <div style={{ fontSize: "0.65rem", fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", marginBottom: 6 }}>{num}</div>
          <div style={{ ...F, fontWeight: 700, fontSize: "0.9rem", color: "#fff", textAlign: "center", marginBottom: 4 }}>{title}</div>
          <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", textAlign: "center" }}>{sub}</div>
        </div>
      ))}
    </div>
  );
};

const ServiceMap = ({ vis }) => {
  const items = [
    { title: "Grup Dersleri",       icon: "users",   ofiste: true,  online: true  },
    { title: "Birebir Eğitim",      icon: "star",    ofiste: true,  online: true  },
    { title: "Nefes Terapisi",      icon: "wind",    ofiste: true,  online: true  },
    { title: "Diyetisyen Desteği",  icon: "coffee",  ofiste: true,  online: false },
    { title: "Masabaşı Ergonomisi", icon: "monitor", ofiste: true,  online: false },
    { title: "Dış Aktiviteler",     icon: "mappin",  ofiste: true,  online: false },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1rem" }}>
        {items.map(({ title, icon, ofiste, online }, i) => (
          <div key={title} style={{ ...fade(vis, i * 0.07), background: C.white, border: "1px solid "+C.gray200, borderRadius: 14, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: C.orgBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Ico d={IC[icon]} size={20} color={C.org} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...F, fontWeight: 700, fontSize: "0.88rem", color: C.navy, marginBottom: 6 }}>{title}</div>
              <div style={{ display: "flex", gap: 6 }}>
                {ofiste && <span style={{ background: C.orgBg, color: C.org, fontSize: "0.68rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: 100 }}>Ofiste</span>}
                {online && <span style={{ background: "rgba(10,22,40,0.08)", color: C.navy, fontSize: "0.68rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: 100 }}>Online</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SVC_DETAILS = {
  "Grup Dersleri": {
    problem: "Çalışanlarınız spor yapmak istiyor ama iş çıkışı spor salonuna gitmiyor. Zaman yok, ulaşım zor, motivasyon düşüyor. Biz bu engelleri ortadan kaldırıyoruz — dersi, eğitmeni ve programı doğrudan şirketinize getiriyoruz.",
    what: "Ekibinizin ihtiyacına ve kondisyon seviyesine göre en uygun dersi birlikte belirliyoruz. Eğitmenimiz şirketinize geliyor, programı sahada uyguluyor.",
    lessons: [
      { name: "Fonksiyonel Antrenman", desc: "Günlük hayatta kullandığımız hareketleri temel alan, tüm vücudu çalıştıran antrenman. Güç, denge ve koordinasyonu aynı anda geliştirir.", online: true },
      { name: "Pilates", desc: "Derin kas gruplarını aktive eden, postürü düzelten ve vücut farkındalığını artıran kontrollü hareket sistemi.", online: true },
      { name: "Yoga", desc: "Nefes, hareket ve zihin bütünlüğünü bir araya getiren pratik. Esneklik, denge ve stres yönetimi için.", online: true },
      { name: "Stretching", desc: "Masa başı çalışmanın yarattığı kas gerginliklerini çözen, hareket açıklığını artıran esneme programı.", online: true },
    ],
  },
  "Birebir Eğitim": {
    problem: "Kişisel hedefi olan ya da bireysel ilgi isteyen çalışanlar için doğru eğitmeni bulmak, programı ayarlamak, iş yoğunluğuyla eğitmen müsaitliğini uyuşturmak, ulaşımı çözmek — bunların hepsi çalışanın önünde engel olarak duruyor. Biz bu engelleri ortadan kaldırıyor, doğru eğitmeni belirliyor, programı tasarlıyor ve şirketinize geliyoruz.",
    what: "Çalışanın fiziksel durumunu, hedeflerini ve iş programını analiz ederek tamamen kişiye özel bir antrenman programı tasarlıyoruz.",
    scope: ["Başlangıç fiziksel değerlendirmesi", "Kişiye özel antrenman programı", "Postür ve hareket analizi", "Aylık ilerleme takibi"],
  },
  "Nefes Terapisi": {
    problem: "Stres ve tükenmişlik her şirkette var. Çözüm olarak genellikle yalnızca ilaç veya terapi düşünülüyor. Oysa nefes teknikleri ve meditasyon, iş yerinde uygulanabilen, anında etki gösteren ve uzun vadeli dönüşüm yaratan güçlü araçlar. Biz bu araçları şirketinize getiriyoruz.",
    what: "Stresin bedensel ve zihinsel etkilerini azaltmak için kanıtlanmış nefes teknikleri ve meditasyon protokolleri uyguluyoruz.",
    scope: ["Bilinçli nefes teknikleri", "Meditasyon ve mindfulness", "Stres yönetimi protokolleri", "Günlük hayata entegre pratikler"],
  },
  "Diyetisyen Desteği": {
    problem: "Düzensiz öğün, atıştırmalık, fast food — ofis hayatının kaçınılmaz döngüsü. Öğleden sonra düşen enerji, konsantrasyon kaybı, verimlilik kaybı bunların doğrudan sonucu. Bireysel diyetisyene gitmek ise zaman ve maliyet istiyor. Biz uzmanımızla şirketinize geliyoruz.",
    what: "Uzmanımız çalışanlarınızın beslenme alışkanlıklarını analiz ediyor, sürdürülebilir ve bilimsel beslenme planları oluşturuyor.",
    scope: ["Bireysel beslenme analizi", "Kişiye özel beslenme planı", "Grup seminerleri ve atölyeler", "Ofis beslenme düzeni danışmanlığı", "Düzenli takip görüşmeleri"],
  },
  "Masabaşı Ergonomisi": {
    problem: "Çalışanlarınız günde 8-10 saat yanlış pozisyonda oturuyor. Bel, boyun, sırt ağrıları zamanla kronikleşiyor, iş gücü kaybına dönüşüyor. Çalışan farkında bile olmayabiliyor — ya da farkında ama ne yapacağını bilmiyor. Biz uzmanlarımızla şirketinize geliyor, çalışma ortamını analiz ediyor ve kişiye özel düzeltici program uyguluyoruz.",
    what: "Uzmanlarımız çalışanlarınızın çalışma ortamını ve duruş alışkanlıklarını analiz ediyor, postür bozukluklarını tespit ediyor ve kişiye özel düzeltici egzersiz programı uyguluyor.",
    scope: ["Bireysel postür analizi", "Çalışma istasyonu değerlendirmesi", "Düzeltici egzersiz programı", "Ergonomik ekipman önerileri", "Masa başı hareketlilik rutinleri"],
  },
  "Dış Aktiviteler": {
    problem: "Şirketler ekip ruhunu güçlendirmek istiyor ama organizasyon yükü ağır — yer bulmak, aktivite seçmek, lojistiği çözmek. Sonuç olarak ya hiç yapılmıyor ya da sıradan bir yemek organizasyonuyla geçiştiriliyor. Biz planlama ve organizasyonun tamamını üstleniyor, şirketinize ve ekibinize özel dış aktiviteler düzenliyoruz.",
    what: "Şirketinizin ekip yapısına ve hedeflerine göre dış aktivite programı tasarlıyor, organizasyonun tamamını üstleniyoruz.",
    scope: ["Belgrad Ormanı yürüyüşleri", "Caddebostan sahil koşuları", "Padel turnuvaları", "Mini futbol organizasyonu", "Şirket içi challenge etkinlikleri"],
  },
};

const ServiceDetailPage = ({ service, onBack, setPage }) => {
  const [rH, vH] = useInView();
  const d = SVC_DETAILS[service.title] || {};
  return (
    <div className="wcx-page">
      <section style={{ paddingTop: "8rem", paddingBottom: "5rem", paddingLeft: "2rem", paddingRight: "2rem", background: "linear-gradient(135deg,"+C.navy+" 0%,"+C.navy2+" 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div ref={rH} style={inner}>
          <button onClick={onBack} style={{ ...F, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 6, marginBottom: "2rem" }}>
            ← Geri Dön
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "1.5rem" }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: C.org, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ico d={IC[service.icon]} size={28} color="#fff" />
            </div>
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                {service.tags.map(t => (
                  <span key={t} style={{ background: t === "Online" ? "rgba(255,255,255,0.15)" : C.orgBg, color: t === "Online" ? "#fff" : C.org, fontSize: "0.68rem", fontWeight: 700, padding: "0.22rem 0.65rem", borderRadius: 100 }}>{t}</span>
                ))}
              </div>
              <h1 style={{ ...F, fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#fff", letterSpacing: "-0.03em", margin: 0 }}>{service.title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: C.white, padding: "5rem 2rem" }}>
        <div style={{ ...inner, maxWidth: 960 }}>
          <div style={{ background: C.gray50, border: "1px solid "+C.gray200, borderRadius: 16, padding: "2rem", marginBottom: "3rem", borderLeft: "4px solid "+C.org }}>
            <div style={tag}>Problem</div>
            <p style={{ fontSize: "1rem", color: C.gray700, lineHeight: 1.85, margin: 0 }}>{d.problem}</p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <div style={tag}>Ne Yapıyoruz?</div>
            <p style={{ ...F, fontSize: "1rem", color: C.navy, lineHeight: 1.85, fontWeight: 500, marginBottom: "2rem" }}>{d.what}</p>

            {d.lessons && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
                {d.lessons.map(({ name, desc, online }) => (
                  <div key={name} style={{ background: C.gray50, border: "1px solid "+C.gray200, borderRadius: 14, padding: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ ...F, fontWeight: 700, fontSize: "0.95rem", color: C.navy }}>{name}</div>
                      {online && <span style={{ background: C.orgBg, color: C.org, fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: 100 }}>Online</span>}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: C.gray500, lineHeight: 1.75 }}>{desc}</div>
                  </div>
                ))}
              </div>
            )}

            {d.scope && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {d.scope.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0.9rem 1.25rem", background: C.gray50, borderRadius: 10, border: "1px solid "+C.gray200 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: C.orgBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Ico d={IC.check} size={13} color={C.org} />
                    </div>
                    <span style={{ fontSize: "0.9rem", color: C.gray700 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section style={{ background: C.navy2, padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ ...F, fontWeight: 800, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#fff", marginBottom: "1.25rem" }}>
          Bu hizmet için teklif alın.
        </h2>
        <button style={btnO} onClick={() => { setPage("contact"); window.scrollTo({ top: 0 }); }}>
          İletişime Geçin <Ico d={IC.arrow} size={18} color="#fff" />
        </button>
      </section>
    </div>
  );
};

const Navbar = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [
    { label: "Ana Sayfa", id: "home" },
    { label: "Hizmetlerimiz", id: "services" },
    { label: "Hakkımızda", id: "about" },
    { label: "İletişim", id: "contact" },
  ];
  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.93)", backdropFilter: "blur(20px)", boxShadow: scrolled ? "0 1px 24px rgba(10,22,40,0.08)" : "none", transition: "all 0.3s ease" }}>
      <div style={{ ...inner, padding: "0 2rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span onClick={() => go("home")} style={{ ...F, fontWeight: 900, fontSize: "1.5rem", letterSpacing: "-0.04em", color: C.org, cursor: "pointer" }}>WcorpX</span>
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {links.map(({ label, id }) => (
            <span key={id} onClick={() => go(id)} style={{ ...F, fontSize: "0.88rem", fontWeight: page === id ? 700 : 500, color: page === id ? C.org : C.gray700, padding: "0.4rem 0.85rem", borderRadius: 7, background: page === id ? C.orgBg : "transparent", cursor: "pointer", transition: "all 0.2s" }}>{label}</span>
          ))}
          <span onClick={() => go("contact")} style={{ ...F, background: C.org, color: "#fff", fontWeight: 700, fontSize: "0.88rem", padding: "0.6rem 1.4rem", borderRadius: 7, cursor: "pointer", marginLeft: 8, boxShadow: "0 2px 12px rgba(249,115,22,0.3)" }}>Teklif Alın</span>
        </nav>
      </div>
    </header>
  );
};

const Footer = ({ setPage }) => {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <footer style={{ background: C.navy, padding: "4rem 2rem 2rem" }}>
      <div style={inner}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>
          <div>
            <div style={{ ...F, fontWeight: 900, fontSize: "1.5rem", color: C.org, letterSpacing: "-0.04em", marginBottom: "1rem" }}>WcorpX</div>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.78, color: "rgba(255,255,255,0.55)", maxWidth: 260 }}>Bilimsel ve sahaya dayalı wellness çözümleriyle çalışanlarınızın en iyi versiyonlarını ortaya çıkarıyoruz.</p>
          </div>
          <div>
            <div style={{ ...F, fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", marginBottom: "1.25rem" }}>Sayfalar</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[["Ana Sayfa","home"],["Hizmetlerimiz","services"],["Hakkımızda","about"],["İletişim","contact"]].map(([l,id]) => (
                <span key={id} onClick={() => go(id)} style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", cursor: "pointer" }}>{l}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ ...F, fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", marginBottom: "1.25rem" }}>İletişim</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { icon: "mail", text: "burak.koc@wcorpx.com", href: "mailto:burak.koc@wcorpx.com" },
                { icon: "mail", text: "tarik.eken@wcorpx.com", href: "mailto:tarik.eken@wcorpx.com" },
                { icon: "instagram", text: "@wcorpx", href: "https://instagram.com/wcorpx" },
                { icon: "linkedin", text: "LinkedIn / WcorpX", href: "https://linkedin.com/company/wcorpx" },
              ].map(({ icon, text, href }) => (
                <a key={text} href={href} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                  <Ico d={IC[icon]} size={14} color={C.org} />
                  <div style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.70)" }}>{text}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem" }}>
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.28)" }}>© 2025 WcorpX. Tüm hakları saklıdır.</span>
        </div>
      </div>
    </footer>
  );
};

const HomePage = ({ setPage }) => {
  const [rStats, vStats] = useInView();
  const [rEvents, vEvents] = useInView();
  const [rWhy, vWhy] = useInView();
  const [rSvc, vSvc] = useInView();
  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="wcx-page">
      <section style={{ paddingTop: "9rem", paddingBottom: "7rem", paddingLeft: "2rem", paddingRight: "2rem", background: "linear-gradient(135deg,"+C.navy+" 0%,#0d1f3c 60%,#1a1a2e 100%)", position: "relative", overflow: "hidden", minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <div className="wcx-geo1" style={{ position: "absolute", top: "10%", right: "8%", width: 280, height: 280, borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", background: "rgba(249,115,22,0.07)", pointerEvents: "none" }} />
        <div className="wcx-geo2" style={{ position: "absolute", bottom: "15%", right: "20%", width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(249,115,22,0.15)", pointerEvents: "none" }} />
        <div className="wcx-geo3" style={{ position: "absolute", top: "30%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

        <div style={{ ...inner, width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 700 }}>
            <div className="wcx-word" style={{ animationDelay: "0.05s", display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.74rem", fontWeight: 700, color: C.org, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "2rem" }}>
              <Ico d={IC.check} size={13} color={C.org} /> Bilimsel & Sahada Kanıtlanmış
            </div>

            <h1 style={{ ...F, fontWeight: 900, fontSize: "clamp(2.2rem,5vw,4rem)", lineHeight: 1.1, letterSpacing: "-0.04em", color: "#fff", marginBottom: "1.5rem" }}>
              <span style={{ display: "block" }}>
                <AnimWords text="Güçlü çalışan," baseDelay={0.15} />
              </span>
              <span style={{ display: "block" }}>
                <AnimWords text="güçlü şirket." baseDelay={0.4} color={C.org} />
              </span>
            </h1>

            <p className="wcx-word" style={{ animationDelay: "0.75s", fontSize: "1.15rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", marginBottom: "2.5rem", maxWidth: 520 }}>
              Uygulama değil. Platform değil. <strong style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>Biz sahaya geliyoruz.</strong>
            </p>

            <div className="wcx-word" style={{ animationDelay: "0.9s", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <button style={btnO} onClick={() => go("services")}>
                Hizmetlerimizi İnceleyin <Ico d={IC.arrow} size={18} color="#fff" />
              </button>
              <button style={{ ...btnOL, color: "#fff", borderColor: "rgba(255,255,255,0.3)" }} onClick={() => go("contact")}>
                Ücretsiz Görüşme <Ico d={IC.chevron} size={18} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: C.navy, padding: "5rem 2rem" }}>
        <div ref={rStats} style={inner}>
          <div style={{ ...fade(vStats, 0), textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ ...tag, color: C.org }}>Araştırmalar Ne Diyor?</div>
            <h2 style={{ ...h2s, color: "#fff", marginTop: 4 }}>Kurumsal Wellness'ın <span style={{ color: C.org }}>Etkisi</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.25rem" }}>
            <StatCounter value={25} suffix="%" label="Sağlık Gideri Azalması" sub="Hastalık izni ve sigorta maliyetlerinde" vis={vStats} delay={0} />
            <StatCounter value={20} suffix="%" label="Verimlilik Artışı" sub="Wellness programı uygulayan şirketler" vis={vStats} delay={0.1} />
            <StatCounter value={73} suffix="%" label="Sağlıklı Alışkanlık" sub="Katılımcıların program sonrası değişimi" vis={vStats} delay={0.2} />
            <StatCounter value={327} prefix="" suffix="x" label="ROI Katsayısı" sub="Her 1 TL yatırım için 3.27 TL tasarruf" vis={vStats} delay={0.3} />
          </div>
          <div style={{ ...fade(vStats, 0.5), textAlign: "center", marginTop: "1.5rem" }}>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>Kaynak: IFEBP, Gitnux Research</span>
          </div>
        </div>
      </section>

      <section style={{ background: C.gray50, padding: "5rem 2rem" }}>
        <div ref={rEvents} style={inner}>
          <div style={{ ...fade(vEvents, 0), textAlign: "center", marginBottom: "3rem" }}>
            <div style={tag}>Nasıl Çalışırız?</div>
            <h2 style={h2s}>Ofiste de <span style={{ color: C.org }}>Online da</span> Yanınızdayız</h2>
            <p style={{ fontSize: "1rem", color: C.gray500, lineHeight: 1.75, maxWidth: 520, margin: "0 auto" }}>Çalışanlarınızın bulunduğu her yerde, istediğiniz formatta wellness deneyimi sunuyoruz.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {[
              { icon: "building", title: "Ofiste Etkinlikler", bg: "linear-gradient(135deg,"+C.navy+" 0%,#1e3a5f 100%)", desc: "Uzman ekibimiz doğrudan şirketinize gelir. Yoga, pilates, fonksiyonel antrenman, nefes terapisi ve ergonomi seansları ofis ortamında gerçekleşir.", items: ["Grup dersleri & bireysel koçluk", "Masabaşı ergonomi analizi", "Açık alan & saha aktiviteleri"] },
              { icon: "video",    title: "Online Etkinlikler",  bg: "linear-gradient(135deg,"+C.navy2+" 0%,#0d2137 100%)", desc: "Uzaktan çalışan ekipler veya farklı şehirlerdeki ofisler için canlı yayın dersleri ve dijital wellness programları sunuyoruz.", items: ["Canlı yayın grup dersleri", "Fonksiyonel antrenman, Yoga, Pilates, Stretching", "Nefes terapisi & meditasyon"] },
            ].map(({ icon, title, bg, desc, items }, i) => (
              <div key={title}
                style={{ ...fade(vEvents, i * 0.1), background: C.white, borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(10,22,40,0.07)", border: "1px solid "+C.gray200, cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => go("services")}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ position: "relative", height: 220, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ico d={IC[icon]} size={56} color="rgba(249,115,22,0.25)" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(10,22,40,0.7) 0%,transparent 60%)" }} />
                  <div style={{ position: "absolute", bottom: 16, left: 20, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: C.org, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Ico d={IC[icon]} size={16} color="#fff" />
                    </div>
                    <span style={{ ...F, fontWeight: 700, fontSize: "1rem", color: "#fff" }}>{title}</span>
                  </div>
                </div>
                <div style={{ padding: "1.75rem" }}>
                  <p style={{ fontSize: "0.9rem", color: C.gray500, lineHeight: 1.75, marginBottom: "1.25rem" }}>{desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {items.map(t => (
                      <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: C.navy }}>
                        <Ico d={IC.check} size={15} color={C.org} />{t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.navy, padding: "5rem 2rem" }}>
        <div ref={rWhy} style={{ ...inner, maxWidth: 960, textAlign: "center" }}>
          <div style={{ ...fade(vWhy, 0), ...tag, color: C.org }}>WcorpX Farkı</div>
          <h2 style={{ ...fade(vWhy, 0.05), ...h2s, color: "#fff", marginTop: 4 }}>Neden <span style={{ color: C.org }}>Biz?</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem", marginTop: "2.5rem" }}>
            {[
              { icon: "check",    t: "Uzman Kadro",          s: "Fizyoterapist, diyetisyen, spor bilimci, nefes terapisti" },
              { icon: "chart",    t: "Ölçülebilir Sonuçlar", s: "Program başında ve sonunda detaylı analiz raporu" },
              { icon: "shield",   t: "Sahada Kanıtlanmış",   s: "Teoriden değil, yıllarca süren gerçek deneyimden" },
              { icon: "activity", t: "Bütünsel Yaklaşım",    s: "Beden, zihin ve sosyal sağlığı birlikte ele alıyoruz" },
            ].map(({ icon, t, s }, i) => (
              <div key={t} style={{ ...fade(vWhy, i * 0.1), background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 14, padding: "1.75rem 1.4rem", transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.14)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(249,115,22,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <Ico d={IC[icon]} size={26} color={C.org} />
                <div style={{ ...F, fontWeight: 700, fontSize: "0.92rem", color: "#fff", margin: "0.8rem 0 0.4rem" }}>{t}</div>
                <div style={{ fontSize: "0.79rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.white, padding: "5rem 2rem" }}>
        <div ref={rSvc} style={inner}>
          <div style={{ ...fade(vSvc, 0), textAlign: "center", marginBottom: "3rem" }}>
            <div style={tag}>Hizmetlerimiz</div>
            <h2 style={h2s}>Ne <span style={{ color: C.org }}>Sunuyoruz?</span></h2>
            <p style={{ fontSize: "1rem", color: C.gray500, lineHeight: 1.75, maxWidth: 520, margin: "0 auto" }}>Her hizmet şirketinizin ihtiyaçlarına göre özelleştiriliyor.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem" }}>
            {[
              { icon: "users",   title: "Grup Dersleri",       desc: "Yoga, Pilates, Fonksiyonel Antrenman, Stretching — ofiste veya online.", tags: ["Ofiste","Online"] },
              { icon: "star",    title: "Birebir Eğitim",      desc: "Kişiye özel 1:1 koçluk. Doğru eğitmeni buluyoruz, sahaya geliyoruz.", tags: ["Ofiste","Online"] },
              { icon: "wind",    title: "Nefes Terapisi",      desc: "Kanıtlanmış nefes teknikleri ve meditasyon. Anlık rahatlama, uzun vadeli dönüşüm.", tags: ["Ofiste","Online"] },
              { icon: "coffee",  title: "Diyetisyen Desteği",  desc: "Bireysel danışmanlık ve grup seminerleriyle sürdürülebilir beslenme.", tags: ["Ofiste"] },
              { icon: "monitor", title: "Masabaşı Ergonomisi", desc: "Postür analizi, çalışma ortamı değerlendirmesi, düzeltici program.", tags: ["Ofiste"] },
              { icon: "mappin",  title: "Dış Aktiviteler",     desc: "Belgrad Ormanı, Caddebostan, padel turnuvaları — ekip ruhu için.", tags: ["Ofiste"] },
            ].map(({ icon, title, desc, tags }, i) => (
              <div key={title}
                style={{ ...fade(vSvc, i * 0.08), background: C.gray50, border: "1px solid "+C.gray200, borderRadius: 16, padding: "1.75rem", cursor: "pointer", transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(10,22,40,0.10)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = C.org; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = C.gray200; }}
                onClick={() => go("services")}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: C.orgBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Ico d={IC[icon]} color={C.org} />
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {tags.map(t => <span key={t} style={{ background: t === "Online" ? C.navy : C.orgBg, color: t === "Online" ? "#fff" : C.org, fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.55rem", borderRadius: 100 }}>{t}</span>)}
                  </div>
                </div>
                <div style={{ ...F, fontWeight: 700, fontSize: "0.97rem", color: C.navy, marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: "0.85rem", color: C.gray500, lineHeight: 1.75 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <button style={btnO} onClick={() => go("services")}>Tüm Hizmetleri Gör <Ico d={IC.arrow} size={18} color="#fff" /></button>
          </div>
        </div>
      </section>

      <section style={{ background: C.navy2, padding: "4.5rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%,rgba(249,115,22,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <h2 style={{ ...F, fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "1rem" }}>Şirketiniz için ücretsiz wellness analizi isteyin.</h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", marginBottom: "2rem" }}>Sizi arayalım, ihtiyaçlarınızı dinleyelim ve size özel bir yol haritası çizelim.</p>
        <button style={{ ...btnO, fontSize: "1.05rem", padding: "1rem 2.5rem" }} onClick={() => go("contact")}>
          Ücretsiz Analiz Talep Et <Ico d={IC.arrow} size={20} color="#fff" />
        </button>
      </section>
    </div>
  );
};

const ServicesPage = ({ setPage }) => {
  const [rH, vH] = useInView();
  const [rS, vS] = useInView();
  const [rM, vM] = useInView();
  const [rA, vA] = useInView();
  const [sel, setSel] = useState(null);

  const services = [
    { icon: "users",   title: "Grup Dersleri",       desc: "Yoga, Pilates, Fonksiyonel Antrenman ve Online seçenekleriyle ofis içinde veya açık alanda.", tags: ["Ofiste","Online"] },
    { icon: "star",    title: "Birebir Eğitim",      desc: "Kişisel hedefi olan çalışanlar için tamamen özelleştirilmiş 1:1 koçluk seansları.", tags: ["Ofiste","Online"] },
    { icon: "wind",    title: "Nefes Terapisi",      desc: "Stres ve kaygı yönetimi için kanıtlanmış nefes teknikleri ve meditasyon programları.", tags: ["Ofiste","Online"] },
    { icon: "coffee",  title: "Diyetisyen Desteği",  desc: "Bireysel danışmanlık ve grup seminerleriyle bilimsel ve sürdürülebilir beslenme.", tags: ["Ofiste"] },
    { icon: "monitor", title: "Masabaşı Ergonomisi", desc: "Postür analizi, çalışma ortamı değerlendirmesi ve kişiye özel düzeltici program.", tags: ["Ofiste"] },
    { icon: "mappin",  title: "Dış Aktiviteler",     desc: "Belgrad Ormanı, Caddebostan, padel ve mini futbol organizasyonlarıyla ekip ruhu.", tags: ["Ofiste"] },
  ];

  const tc = (t) => t === "Online" ? { bg: C.navy, color: "#fff" } : { bg: C.orgBg, color: C.org };

  if (sel) return <ServiceDetailPage service={sel} onBack={() => { setSel(null); window.scrollTo({ top: 0 }); }} setPage={setPage} />;

  return (
    <div className="wcx-page">
      <section style={{ paddingTop: "8rem", paddingBottom: "5rem", paddingLeft: "2rem", paddingRight: "2rem", background: "linear-gradient(135deg,"+C.navy+" 0%,"+C.navy2+" 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div ref={rH} style={{ ...inner, textAlign: "center" }}>
          <div style={{ ...fade(vH, 0), ...tag, color: C.org }}>Hizmetlerimiz</div>
          <h1 style={{ ...fade(vH, 0.1), ...F, fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.03em", marginTop: 8, marginBottom: "1.25rem" }}>
            Bütünsel <span style={{ color: C.org }}>Wellness Çözümleri</span>
          </h1>
          <p style={{ ...fade(vH, 0.2), fontSize: "1.05rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
            Bedensel, zihinsel ve sosyal sağlığı birlikte ele alan kapsamlı hizmet portföyü.
          </p>
        </div>
      </section>

      <section style={{ background: C.white, padding: "5rem 2rem" }}>
        <div ref={rS} style={inner}>
          <div style={{ ...fade(vS, 0), textAlign: "center", marginBottom: "3rem" }}>
            <div style={tag}>Ne Sunuyoruz?</div>
            <h2 style={h2s}>Tüm <span style={{ color: C.org }}>Hizmetlerimiz</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem" }}>
            {services.map(({ icon, title, desc, tags }, i) => {
              const [h, sH] = useState(false);
              return (
                <div key={title}
                  onMouseEnter={() => sH(true)} onMouseLeave={() => sH(false)}
                  onClick={() => { setSel({ icon, title, desc, tags }); window.scrollTo({ top: 0 }); }}
                  style={{ ...fade(vS, i * 0.08), background: C.white, border: "1px solid "+(h ? "transparent" : C.gray200), borderRadius: 16, padding: "2rem", boxShadow: h ? "0 12px 40px rgba(10,22,40,0.10)" : "none", transform: h ? "translateY(-4px)" : "translateY(0)", transition: "all 0.3s", position: "relative", overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.org, transform: h ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.3s" }} />
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 12, background: h ? C.org : C.orgBg, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.25s" }}>
                      <Ico d={IC[icon]} color={h ? "#fff" : C.org} />
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {tags.map(t => { const tC = tc(t); return <span key={t} style={{ background: tC.bg, color: tC.color, fontSize: "0.68rem", fontWeight: 700, padding: "0.22rem 0.65rem", borderRadius: 100 }}>{t}</span>; })}
                    </div>
                  </div>
                  <div style={{ ...F, fontWeight: 700, fontSize: "1rem", color: C.navy, marginBottom: 8 }}>{title}</div>
                  <div style={{ fontSize: "0.875rem", color: C.gray500, lineHeight: 1.75, marginBottom: 14 }}>{desc}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", color: C.org, fontWeight: 600 }}>
                    Detayları Gör <Ico d={IC.arrow} size={14} color={C.org} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: C.gray50, padding: "5rem 2rem" }}>
        <div ref={rM} style={{ ...inner, maxWidth: 860 }}>
          <div style={{ ...fade(vM, 0), textAlign: "center", marginBottom: "3rem" }}>
            <div style={tag}>Nerede Sunuyoruz?</div>
            <h2 style={h2s}>Hizmet <span style={{ color: C.org }}>Haritası</span></h2>
          </div>
          <ServiceMap vis={vM} />
        </div>
      </section>

      <section style={{ background: C.navy, padding: "5rem 2rem" }}>
        <div ref={rA} style={inner}>
          <div style={{ ...fade(vA, 0), textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ ...tag, color: C.org }}>Süreç</div>
            <h2 style={{ ...h2s, color: "#fff", marginTop: 4 }}>Nasıl <span style={{ color: C.org }}>Çalışır?</span></h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 480, margin: "0 auto" }}>
              İlk görüşmeden sahada uygulamaya kadar her adımda yanınızdayız.
            </p>
          </div>
          <HowItWorks vis={vA} />
        </div>
      </section>

      <section style={{ background: C.navy2, padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ ...F, fontWeight: 800, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#fff", marginBottom: "1rem" }}>Şirketinize özel program için konuşalım.</h2>
        <button style={btnO} onClick={() => { setPage("contact"); window.scrollTo({ top: 0 }); }}>
          İletişime Geçin <Ico d={IC.arrow} size={18} color="#fff" />
        </button>
      </section>
    </div>
  );
};

const AboutPage = ({ setPage }) => {
  const [rH, vH] = useInView();
  const [rS, vS] = useInView();
  const [rT, vT] = useInView();
  const [rV, vV] = useInView();

  return (
    <div className="wcx-page">
      <section style={{ paddingTop: "8rem", paddingBottom: "5rem", paddingLeft: "2rem", paddingRight: "2rem", background: "linear-gradient(135deg,"+C.navy+" 0%,"+C.navy2+" 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,.09) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div ref={rH} style={{ ...inner, textAlign: "center" }}>
          <div style={{ ...fade(vH, 0), ...tag, color: C.org }}>Hakkımızda</div>
          <h1 style={{ ...fade(vH, 0.1), ...F, fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.03em", marginTop: 8, marginBottom: "1.25rem" }}>
            Platform Değil. <span style={{ color: C.org }}>Gerçek Ekip.</span> Sahada.
          </h1>
          <p style={{ ...fade(vH, 0.2), fontSize: "1.05rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
            Teoriyi değil, sahada çalışan gerçeği sunuyoruz.
          </p>
        </div>
      </section>

      <section style={{ background: C.white, padding: "5rem 2rem" }}>
        <div ref={rS} style={{ ...inner, maxWidth: 960 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div style={slideIn(vS, 0, "left")}>
              <div style={tag}>Hikayemiz</div>
              <h2 style={{ ...h2s, marginTop: 8 }}>WcorpX <span style={{ color: C.org }}>Nasıl Doğdu?</span></h2>
              <p style={{ fontSize: "0.95rem", color: C.gray500, lineHeight: 1.9, marginBottom: "1.25rem" }}>Yıllarca İstanbul'un en prestijli spor merkezlerinde bireysel antrenörlük yaparak yüzlerce kişiyle sahada çalıştık. Her gün farklı insanlar, farklı hedefler — ama hep aynı tablo.</p>
              <p style={{ fontSize: "0.95rem", color: C.gray500, lineHeight: 1.9, marginBottom: "1.25rem" }}>Çalışanlar ofiste 8-10 saat hareketsiz oturuyor, stres birikiyor, verimlilik düşüyordu. En motive insanlar bile sistemin içinde sıkışıp kalıyordu.</p>
              <p style={{ fontSize: "0.95rem", color: C.gray500, lineHeight: 1.9, marginBottom: "1.25rem" }}>Piyasaya baktık. Çözümler ya uygulama bazlıydı ya da yüzeysel bir etkinlikten ibaretti. Gerçek, sahada uygulanan, ölçülebilir sonuç üreten, şirkete özel tasarlanmış bir şey yoktu.</p>
              <p style={{ fontSize: "0.95rem", color: C.navy, lineHeight: 1.9, fontWeight: 600 }}>Bu boşluğu doldurmak için WcorpX'i kurduk. Bugün Türkiye genelinde şirketlere özel wellness programları tasarlıyor, uzman ağımızla doğrudan sahada uyguluyoruz.</p>
            </div>
            <div style={slideIn(vS, 0.15, "right")}>
              <div style={{ borderRadius: 20, background: "linear-gradient(135deg,"+C.navy+" 0%,#1e3a5f 100%)", padding: "2.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                  {[
                    { v: "10+",  l: "Yıllık Deneyim", icon: "award" },
                    { v: "15K+", l: "Bireysel Seans",  icon: "users" },
                    { v: "20+",  l: "Şirket & Proje",  icon: "trophy" },
                    { v: "2",    l: "Kurucu Ortak",    icon: "heart" },
                  ].map(({ v, l, icon }) => (
                    <div key={l} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "1.5rem 1rem", textAlign: "center" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: C.orgBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                        <Ico d={IC[icon]} size={16} color={C.org} />
                      </div>
                      <div style={{ ...F, fontWeight: 900, fontSize: "1.6rem", color: "#fff", letterSpacing: "-0.03em" }}>{v}</div>
                      <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "1.25rem", background: "rgba(249,115,22,0.1)", borderRadius: 12, border: "1px solid rgba(249,115,22,0.2)" }}>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>"Sporu çalışanın ayağına götürmek, wellness'ı şirket kültürünün parçası haline getirmek için kurduk."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: C.gray50, padding: "5rem 2rem" }}>
        <div ref={rT} style={inner}>
          <div style={{ ...fade(vT, 0), textAlign: "center", marginBottom: "3rem" }}>
            <div style={tag}>Kurucularımız</div>
            <h2 style={h2s}>Bizi <span style={{ color: C.org }}>Tanıyın</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))", gap: "2rem" }}>
            {[
              { name: "Burak Koç", title: "Co-Founder & Head Coach", mail: "burak.koc@wcorpx.com", bio: "10 yılı aşkın süre İstanbul'un en prestijli spor merkezlerinde 15.000'i aşkın bireysel seans yaptım. Ulusal ve uluslararası alanda çok sayıda sertifika, workshop ve webinar ile alanımı sürekli geliştirdim. Sahada gördüm: en motive insanlar bile ofise girince hareketten kopuyor, enerji düşüyor, verimlilik kayboluyor. Bu tabloyu değiştirmek için Tarık ile birlikte WcorpX'i kurdum." },
              { name: "Tarık Eken", title: "Co-Founder & Group Fitness Coach", mail: "tarik.eken@wcorpx.com", bio: "10 yılı aşkın süre İstanbul'un önde gelen spor merkezlerinde binlerce kişiye grup dersi verdim. Ulusal ve uluslararası alanda çok sayıda sertifika, workshop ve webinar ile alanımı sürekli geliştiriyorum. Kurumsal dünyada wellness'ın nasıl çalışması gerektiğini sahada öğrendim — WcorpX bu deneyimin ürünü." },
            ].map(({ name, title, mail, bio }, i) => (
              <div key={name} style={{ ...fade(vT, i * 0.15), background: C.white, border: "1px solid "+C.gray200, borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(10,22,40,0.06)" }}>
                <div style={{ height: 6, background: "linear-gradient(to right,"+C.org+",#fb923c)" }} />
                <div style={{ padding: "2rem" }}>
                  <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                    <div style={{ width: 72, height: 72, borderRadius: 16, flexShrink: 0, background: "linear-gradient(135deg,"+C.navy+" 0%,#1e3a5f 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Ico d={IC.users} size={30} color="rgba(249,115,22,0.5)" />
                    </div>
                    <div>
                      <div style={{ ...F, fontWeight: 800, fontSize: "1.15rem", color: C.navy }}>{name}</div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: C.org, marginTop: 4 }}>{title}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: C.gray500, lineHeight: 1.85, marginBottom: "1.25rem", fontStyle: "italic" }}>"{bio}"</p>
                  <div style={{ borderTop: "1px solid "+C.gray200, paddingTop: "1.25rem" }}>
                    <a href={"mailto:"+mail} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.85rem", color: C.navy, textDecoration: "none", fontWeight: 600 }}>
                      <Ico d={IC.mail} size={14} color={C.org} />{mail}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.navy, padding: "5rem 2rem" }}>
        <div ref={rV} style={{ ...inner, maxWidth: 960 }}>
          <div style={{ ...fade(vV, 0), textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ ...tag, color: C.org }}>Değerlerimiz</div>
            <h2 style={{ ...h2s, color: "#fff", marginTop: 4 }}>Misyon & <span style={{ color: C.org }}>Vizyon</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[
              { icon: "heart",  title: "Misyonumuz",   desc: "Türkiye'deki şirketlerin çalışan sağlığına yatırım yapmasını kolaylaştırmak. Bilimsel, sahada kanıtlanmış ve ölçülebilir wellness programlarıyla kurumsal performansı artırmak." },
              { icon: "star",   title: "Vizyonumuz",   desc: "Kurumsal wellness'ın bir lüks değil, her şirketin erişebildiği bir standart haline gelmesi. Sağlıklı çalışanlar, güçlü şirketler." },
              { icon: "shield", title: "Yaklaşımımız", desc: "Her program veri ile başlar, sahada uygulanır, sonuçları ölçülür. Teori değil, çalışan gerçek." },
              { icon: "users",  title: "Uzman Ağımız", desc: "Fizyoterapist, diyetisyen, spor bilimci, nefes terapisti ve yoga-pilates uzmanlarından oluşan seçkin bir ağ." },
            ].map(({ icon, title, desc }, i) => (
              <div key={title} style={{ ...fade(vV, i * 0.1), background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "2rem", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: C.orgBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Ico d={IC[icon]} size={20} color={C.org} />
                </div>
                <div style={{ ...F, fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.75 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.navy2, padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ ...F, fontWeight: 800, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#fff", marginBottom: "1rem" }}>Birlikte çalışalım.</h2>
        <button style={btnO} onClick={() => { setPage("contact"); window.scrollTo({ top: 0 }); }}>
          İletişime Geçin <Ico d={IC.arrow} size={18} color="#fff" />
        </button>
      </section>
    </div>
  );
};

const ContactPage = () => {
  const [rH, vH] = useInView();
  const [rM, vM] = useInView();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/xwpkvgko", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
      else alert("Bir hata oluştu, lütfen tekrar deneyin.");
    } catch { alert("Bağlantı hatası, lütfen tekrar deneyin."); }
    finally { setSending(false); }
  };

  const inp = { width: "100%", padding: "0.85rem 1rem", borderRadius: 9, border: "1.5px solid "+C.gray200, fontSize: "0.9rem", color: C.navy, background: C.white, outline: "none", boxSizing: "border-box", fontFamily: "\'Plus Jakarta Sans\', system-ui, sans-serif", transition: "border-color 0.2s" };

  return (
    <div className="wcx-page">
      <section style={{ paddingTop: "8rem", paddingBottom: "5rem", paddingLeft: "2rem", paddingRight: "2rem", background: "linear-gradient(135deg,"+C.navy+" 0%,"+C.navy2+" 100%)", position: "relative", overflow: "hidden" }}>
        <div ref={rH} style={{ ...inner, textAlign: "center" }}>
          <div style={{ ...fade(vH, 0), ...tag, color: C.org }}>İletişim</div>
          <h1 style={{ ...fade(vH, 0.1), ...F, fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.03em", marginTop: 8, marginBottom: "1.25rem" }}>
            Birlikte <span style={{ color: C.org }}>Başlayalım</span>
          </h1>
          <p style={{ ...fade(vH, 0.2), fontSize: "1.05rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.8, maxWidth: 500, margin: "0 auto" }}>
            İlk görüşme tamamen ücretsiz. Şirketinizin ihtiyaçlarını dinler, size özel bir yol haritası sunarız.
          </p>
        </div>
      </section>

      <section style={{ background: C.gray50, padding: "5rem 2rem" }}>
        <div ref={rM} style={{ ...inner, maxWidth: 1050 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem", alignItems: "start" }}>
            <div style={fade(vM, 0)}>
              <div style={{ ...F, fontWeight: 700, fontSize: "1.15rem", color: C.navy, marginBottom: "2rem" }}>Bize Ulaşın</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
                {[
                  { icon: "mail",      label: "Burak Koç",  value: "burak.koc@wcorpx.com",  href: "mailto:burak.koc@wcorpx.com" },
                  { icon: "mail",      label: "Tarık Eken", value: "tarik.eken@wcorpx.com", href: "mailto:tarik.eken@wcorpx.com" },
                  { icon: "instagram", label: "Instagram",  value: "@wcorpx",               href: "https://instagram.com/wcorpx" },
                  { icon: "linkedin",  label: "LinkedIn",   value: "WcorpX",                href: "https://linkedin.com/company/wcorpx" },
                ].map(({ icon, label, value, href }) => (
                  <a key={value} href={href} target="_blank" rel="noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", padding: "1rem 1.25rem", background: C.white, borderRadius: 12, border: "1px solid "+C.gray200, transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.org; e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.gray200; e.currentTarget.style.transform = "translateX(0)"; }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: C.orgBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Ico d={IC[icon]} size={17} color={C.org} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.73rem", fontWeight: 700, color: C.gray500, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: "0.9rem", color: C.navy, fontWeight: 500 }}>{value}</div>
                    </div>
                  </a>
                ))}
              </div>
              <div style={{ background: C.navy, borderRadius: 14, padding: "1.5rem 1.75rem" }}>
                <div style={{ ...F, fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: "0.5rem" }}>Ücretsiz Keşif Görüşmesi</div>
                <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.7, margin: 0 }}>İlk görüşme tamamen ücretsizdir. Şirketinizin ihtiyaçlarını dinler, size özel bir yol haritası sunarız.</p>
              </div>
            </div>

            <div style={{ ...fade(vM, 0.1), background: C.white, borderRadius: 18, padding: "2.5rem 2rem", boxShadow: "0 4px 32px rgba(10,22,40,0.07)", border: "1px solid "+C.gray200 }}>
              <div style={{ ...F, fontWeight: 700, fontSize: "1.1rem", color: C.navy, marginBottom: "1.75rem" }}>Mesaj Gönderin</div>
              {sent ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.orgBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                    <Ico d={IC.check} size={28} color={C.org} />
                  </div>
                  <div style={{ ...F, fontWeight: 700, fontSize: "1.2rem", color: C.navy, marginBottom: "0.5rem" }}>Mesajınız İletildi!</div>
                  <p style={{ color: C.gray500, fontSize: "0.9rem" }}>En kısa sürede sizinle iletişime geçeceğiz.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ fontSize: "0.78rem", fontWeight: 700, color: C.navy, marginBottom: "0.4rem", display: "block" }}>Ad Soyad *</label>
                      <input required style={inp} placeholder="Adınız Soyadınız" value={form.name} onChange={e => setForm({...form, name: e.target.value})} onFocus={e => e.target.style.borderColor = C.org} onBlur={e => e.target.style.borderColor = C.gray200} />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.78rem", fontWeight: 700, color: C.navy, marginBottom: "0.4rem", display: "block" }}>E-posta *</label>
                      <input required type="email" style={inp} placeholder="ornek@sirket.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} onFocus={e => e.target.style.borderColor = C.org} onBlur={e => e.target.style.borderColor = C.gray200} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 700, color: C.navy, marginBottom: "0.4rem", display: "block" }}>Şirket Adı</label>
                    <input style={inp} placeholder="Şirketinizin adı" value={form.company} onChange={e => setForm({...form, company: e.target.value})} onFocus={e => e.target.style.borderColor = C.org} onBlur={e => e.target.style.borderColor = C.gray200} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 700, color: C.navy, marginBottom: "0.4rem", display: "block" }}>Mesajınız *</label>
                    <textarea required rows={5} style={{ ...inp, resize: "vertical", lineHeight: 1.65 }} placeholder="Şirketinizin ihtiyaçlarını paylaşın..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} onFocus={e => e.target.style.borderColor = C.org} onBlur={e => e.target.style.borderColor = C.gray200} />
                  </div>
                  <button type="submit" disabled={sending} style={{ background: sending ? C.gray200 : C.org, color: sending ? C.gray500 : "#fff", ...F, fontWeight: 700, fontSize: "1rem", padding: "0.95rem 2rem", borderRadius: 9, border: "none", cursor: sending ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s", boxShadow: sending ? "none" : "0 4px 16px rgba(249,115,22,0.3)" }}>
                    {sending ? "Gönderiliyor..." : <><Ico d={IC.send} size={17} color="#fff" /> Mesaj Gönder</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default function WcorpX() {
  const [page, setPage] = useState("home");
  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <div style={{ ...F, background: C.white, color: C.navy, minHeight: "100vh" }}>
      <Navbar page={page} setPage={go} />
      <main>
        {page === "home"     && <HomePage     setPage={go} />}
        {page === "services" && <ServicesPage setPage={go} />}
        {page === "about"    && <AboutPage    setPage={go} />}
        {page === "contact"  && <ContactPage />}
      </main>
      <Footer setPage={go} />
    </div>
  );
}
