import React from "react";
import { useState, useEffect, useRef } from "react";

const C = {
  navy:  "#0A1628",
  navy2: "#162340",
  org:   "#F97316",
  orgBg: "rgba(249,115,22,0.10)",
  white: "#ffffff",
  gray50:  "#F8FAFC",
  gray100: "#F1F5F9",
  gray200: "#E5E7EB",
  gray500: "#6B7280",
  gray700: "#374151",
};

const useInView = () => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.05 }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, vis];
};

const fade = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? "translateY(0)" : "translateY(24px)",
  transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
});

const Ico = ({ d, size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  target:   "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-6a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4",
  zap:      "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  award:    "M12 15l-4.243 4.243 1.06-5.656L4.03 9.757l5.699-.828L12 4l2.271 4.929 5.699.828-4.787 3.83 1.06 5.656L12 15z",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  wind:     "M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2",
  coffee:   "M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3",
  monitor:  "M20 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8 21h8M12 17v4",
  sun:      "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  check:    "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  chart:    "M18 20V10M12 20V4M6 20v-6",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  chevron:  "M9 18l6-6-6-6",
  menu:     "M3 12h18M3 6h18M3 18h18",
  x:        "M18 6 6 18M6 6l12 12",
  heart:    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  tree:     "M17 8C8 10 5.9 16.17 3.82 22M9.5 9.5c1 5.5 4 7 6.5 8M15 9c-3 2-3.5 6-3.5 8",
  trophy:   "M8 21h8M12 17v4M7 4H4v5a8 8 0 0 0 8 8 8 8 0 0 0 8-8V4h-3M5 8h14",
  phone:    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  mail:     "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  map:      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  instagram:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z",
};

const SvcCard = ({ iconKey, title, desc, delay, vis }) => {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        ...fade(vis, delay),
        background: C.white,
        border: `1px solid ${h ? "transparent" : C.gray200}`,
        borderRadius: 14,
        padding: "1.75rem 1.5rem",
        boxShadow: h ? "0 12px 40px rgba(10,22,40,0.11)" : "none",
        transform: vis ? (h ? "translateY(-5px)" : "translateY(0)") : "translateY(24px)",
        transition: "opacity 0.65s ease, transform 0.3s ease, border-color 0.3s, box-shadow 0.3s",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.org, transform: h ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.3s" }} />
      <div style={{ width: 50, height: 50, borderRadius: 12, background: h ? C.org : C.orgBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, transition: "background 0.25s" }}>
        <Ico d={ICONS[iconKey]} color={h ? "#fff" : C.org} />
      </div>
      <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "0.97rem", color: C.navy, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: "0.875rem", color: C.gray500, lineHeight: 1.75 }}>{desc}</div>
    </div>
  );
};

const StatCard = ({ value, label, sub }) => {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${h ? "rgba(249,115,22,0.35)" : "rgba(255,255,255,0.10)"}`,
        borderRadius: 16,
        padding: "2rem 1.5rem",
        textAlign: "center",
        transition: "all 0.3s",
        cursor: "default",
      }}
    >
      <div style={{ fontFamily: "Georgia, serif", fontWeight: 900, fontSize: "clamp(2rem,4vw,2.8rem)", color: C.org, letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
      <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#fff", marginTop: "0.5rem" }}>{label}</div>
      {sub && <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginTop: "0.3rem" }}>{sub}</div>}
    </div>
  );
};

export default function WcorpX() {
  const [mOpen, setMOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  const [rHero,  vHero]  = useInView();
  const [rStats, vStats] = useInView();
  const [rApp,   vApp]   = useInView();
  const [rSvc,   vSvc]   = useInView();
  const [rTeam,  vTeam]  = useInView();
  const [rChall, vChall] = useInView();
  const [rWhy,   vWhy]   = useInView();

  const approach = [
    { icon: "target", num: "01", title: "Derin Analiz",     desc: "Postür, mobilite, esneklik, MaxVO₂ ve vücut kompozisyonu testleriyle şirketinizin sağlık haritasını çıkarıyoruz." },
    { icon: "zap",    num: "02", title: "Program Tasarımı", desc: "Elde ettiğimiz verilerle yalnızca sizin kurumunuza özel, bilimsel temelli bir wellness programı oluşturuyoruz." },
    { icon: "award",  num: "03", title: "Sahada Uygulama",  desc: "Uzman ekibimiz ofise gelir, programı canlı olarak yürütür. Biz her adımda yanınızdayız." },
  ];

  const services = [
    { icon: "users",   title: "Grup Dersleri",       desc: "Yoga, Pilates, Kuvvet, Stretching, Fonksiyonel Antrenman, Indoor Cycling ve Online seçenekleriyle ofis içinde veya açık alanda." },
    { icon: "star",    title: "Birebir Eğitim",      desc: "Yöneticiler ve çalışanlar için kişiye özel 1:1 koçluk seansları. Kişisel eğitmen deneyimi." },
    { icon: "wind",    title: "Nefes Terapisi",      desc: "Stres ve kaygı yönetimi için kanıtlanmış nefes teknikleri ve meditasyon programları." },
    { icon: "coffee",  title: "Diyetisyen Desteği",  desc: "Grup seminerleri ve bireysel danışmanlıkla beslenme alışkanlıklarını dönüştürüyoruz." },
    { icon: "monitor", title: "Masabaşı Ergonomisi", desc: "Fizyoterapistlerimiz çalışma ortamlarını analiz eder, postür bozukluklarını önleriz. Saha ve depo ekiplerine özel ergonomi eğitimi." },
    { icon: "sun",     title: "Dış Aktiviteler",     desc: "Belgrad Ormanı yürüyüşleri, Caddebostan koşuları, padel turnuvaları ve mini futbol etkinlikleriyle takım ruhunu pekiştiriyoruz." },
  ];

  const team = [
    { title: "Fizyoterapistler",                 sub: "Postür & ergonomi analizi" },
    { title: "Spor Bilim Uzmanları",             sub: "Performans & kondisyon programları" },
    { title: "Diyetisyenler",                    sub: "Beslenme danışmanlığı & seminerler" },
    { title: "Nefes Terapistleri",               sub: "Stres & kaygı yönetimi" },
    { title: "Yoga / Pilates Eğitmenleri",       sub: "Esneklik, denge & rehabilitasyon" },
    { title: "Kurumsal Performans Danışmanları", sub: "Program tasarımı & raporlama" },
  ];

  const challenges = [
    { icon: "activity", title: "Adım Yarışması",   desc: "Haftalık adım rekabeti — takım veya bireysel olarak kurumun en aktif çalışanları belirlenir." },
    { icon: "shield",   title: "Kuvvet Yarışması", desc: "Şirket içi kuvvet testleri ve liderboard ile motivasyonu yüksek tutuyoruz." },
    { icon: "star",     title: "Denge Yarışması",  desc: "Denge ve koordinasyon testleriyle hem eğlenceli hem sağlıklı bir rekabet ortamı yaratıyoruz." },
  ];

  const sora    = { fontFamily: "Georgia, 'Times New Roman', serif" };
  const btnOrg  = { background: C.org, color: "#fff", ...sora, fontWeight: 700, fontSize: "1rem", padding: "0.9rem 2rem", borderRadius: 9, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 };
  const btnOutl = { background: "transparent", color: C.navy, ...sora, fontWeight: 700, fontSize: "1rem", padding: "0.875rem 2rem", borderRadius: 9, border: `2px solid ${C.navy}`, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 };
  const tag     = { display: "inline-block", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.13em", textTransform: "uppercase", color: C.org, marginBottom: 8 };
  const h2style = { ...sora, fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", color: C.navy, letterSpacing: "-0.02em", marginBottom: 12 };
  const inner   = { maxWidth: 1200, margin: "0 auto" };
  const grid3   = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginTop: "3rem" };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: C.white, color: C.navy, minHeight: "100vh" }}>

      {/* ══ NAVBAR ══ */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.93)",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        boxShadow: scrolled ? "0 1px 24px rgba(10,22,40,0.08)" : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ ...inner, padding: "0 2rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" style={{ ...sora, fontWeight: 900, fontSize: "1.5rem", letterSpacing: "-0.04em", color: C.org, textDecoration: "none" }}>
            WcorpX
          </a>
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {["Hizmetlerimiz", "Ekibimiz", "İletişim"].map(l => (
              <a key={l} href="#" style={{ fontSize: "0.88rem", fontWeight: 500, color: C.gray700, textDecoration: "none" }}>{l}</a>
            ))}
            <button style={{ background: C.org, color: "#fff", ...sora, fontWeight: 700, fontSize: "0.88rem", padding: "0.6rem 1.4rem", borderRadius: 7, border: "none", cursor: "pointer", marginLeft: 8 }}>
              Teklif Alın
            </button>
          </nav>
          <button onClick={() => setMOpen(!mOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer" }}>
            <Ico d={mOpen ? ICONS.x : ICONS.menu} size={24} color={C.navy} />
          </button>
        </div>
        {mOpen && (
          <div style={{ background: C.white, borderTop: `1px solid ${C.gray200}`, padding: "1.25rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {["Hizmetlerimiz", "Ekibimiz", "İletişim"].map(l => (
              <a key={l} href="#" style={{ fontSize: "0.95rem", fontWeight: 500, color: C.gray700, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* ══ HERO ══ */}
      <section style={{ paddingTop: "9rem", paddingBottom: "7rem", paddingLeft: "2rem", paddingRight: "2rem", background: `linear-gradient(155deg, ${C.gray50} 0%, ${C.gray100} 55%, #FFF7ED 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, right: -120, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div ref={rHero} style={inner}>
          <div style={{ ...fade(vHero, 0), display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.22)", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.74rem", fontWeight: 700, color: C.org, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "1.75rem" }}>
            <Ico d={ICONS.check} size={13} color={C.org} />
            Bilimsel & Sahada Kanıtlanmış
          </div>
          <h1 style={{ ...fade(vHero, 0.1), ...sora, fontWeight: 900, fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.13, letterSpacing: "-0.035em", color: C.navy, marginBottom: "1.5rem", maxWidth: 680 }}>
            Kurumsal Performansı <span style={{ color: C.org }}>Dinamik</span><br />Çalışanlarla Zirveye Taşıyın.
          </h1>
          <p style={{ ...fade(vHero, 0.2), fontSize: "1.1rem", lineHeight: 1.82, color: C.gray500, maxWidth: 560, marginBottom: "2.5rem" }}>
            WcorpX ile şirketinizdeki stresi azaltın, çalışan bağlılığını artırın. Bilimsel temelli ve sahada kanıtlanmış bütünsel wellness çözümleri.
          </p>
          <div style={{ ...fade(vHero, 0.3), display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <button style={btnOrg}>Hizmetlerimizi İnceleyin <Ico d={ICONS.arrow} size={18} color="#fff" /></button>
            <button style={btnOutl}>İletişime Geçin <Ico d={ICONS.chevron} size={18} color={C.navy} /></button>
          </div>
        </div>
      </section>

      {/* ══ İSTATİSTİKLER ══ */}
      <section style={{ background: C.navy, padding: "4.5rem 2rem" }}>
        <div ref={rStats} style={inner}>
          <div style={{ ...fade(vStats, 0), textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ ...tag, color: C.org }}>Kanıtlanmış Sonuçlar</div>
            <h2 style={{ ...h2style, color: C.white, marginTop: 4 }}>Rakamlar <span style={{ color: C.org }}>Konuşuyor</span></h2>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.50)", maxWidth: 480, margin: "0 auto" }}>
              Kurumsal wellness yatırımlarının şirket performansına etkisi.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "1.25rem" }}>
            <StatCard value="%63" label="Çalışan Bağlılığı Artışı"  sub="Wellness programı uygulayan şirketler" />
            <StatCard value="%41" label="Devamsızlık Azalması"      sub="Program sonrası ortalama düşüş" />
            <StatCard value="%25" label="Verimlilik Artışı"         sub="Bütünsel wellness uygulamalarında" />
            <StatCard value="%21" label="Sağlık Gideri Tasarrufu"   sub="Kurumsal sağlık maliyetlerinde" />
          </div>
        </div>
      </section>

      {/* ══ APPROACH ══ */}
      <section style={{ background: C.gray50, padding: "5rem 2rem" }}>
        <div ref={rApp} style={inner}>
          <div style={{ ...fade(vApp, 0), textAlign: "center" }}>
            <div style={tag}>Metodolojimiz</div>
            <h2 style={h2style}>3 Adımda Değişim</h2>
          </div>
          <div style={grid3}>
            {approach.map(({ icon, num, title, desc }, i) => (
              <div key={title} style={{ ...fade(vApp, i * 0.12), background: C.white, border: `1px solid ${C.gray200}`, borderRadius: 16, padding: "2.25rem 2rem", position: "relative" }}>
                <div style={{ position: "absolute", top: "1.5rem", right: "1.75rem", ...sora, fontWeight: 900, fontSize: "3.5rem", color: "rgba(249,115,22,0.09)", lineHeight: 1 }}>{num}</div>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <Ico d={ICONS[icon]} color="#fff" />
                </div>
                <div style={{ ...sora, fontWeight: 700, fontSize: "1.05rem", color: C.navy, marginBottom: 10 }}>{title}</div>
                <div style={{ fontSize: "0.875rem", color: C.gray500, lineHeight: 1.75 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section style={{ background: C.white, padding: "5rem 2rem" }}>
        <div ref={rSvc} style={inner}>
          <div style={{ ...fade(vSvc, 0), textAlign: "center" }}>
            <div style={tag}>Hizmetler</div>
            <h2 style={h2style}>Bütünsel Wellness Çözümleri</h2>
            <p style={{ fontSize: "1rem", color: C.gray500, lineHeight: 1.75, maxWidth: 500, margin: "0 auto" }}>
              Bedensel, zihinsel ve sosyal sağlığı birlikte ele alan kapsamlı portföy.
            </p>
          </div>
          <div style={grid3}>
            {services.map(({ icon, title, desc }, i) => (
              <SvcCard key={title} iconKey={icon} title={title} desc={desc} delay={(i % 3) * 0.1} vis={vSvc} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ ŞİRKET İÇİ MÜCADELELER ══ */}
      <section style={{ background: C.gray50, padding: "5rem 2rem" }}>
        <div ref={rChall} style={inner}>
          <div style={{ ...fade(vChall, 0), textAlign: "center" }}>
            <div style={tag}>Gamifikasyon</div>
            <h2 style={h2style}>Şirket İçi <span style={{ color: C.org }}>Mücadeleler</span></h2>
            <p style={{ fontSize: "1rem", color: C.gray500, lineHeight: 1.75, maxWidth: 520, margin: "0 auto" }}>
              Rekabet motivasyonu yaratır. Çalışanlar yarışırken sağlıklı alışkanlıklar doğal olarak gelişir.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
            {challenges.map(({ icon, title, desc }, i) => (
              <div key={title} style={{ ...fade(vChall, i * 0.12), background: C.white, border: `1px solid ${C.gray200}`, borderRadius: 16, padding: "2.25rem 2rem", textAlign: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.orgBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                  <Ico d={ICONS[icon]} size={26} color={C.org} />
                </div>
                <div style={{ ...sora, fontWeight: 700, fontSize: "1rem", color: C.navy, marginBottom: 10 }}>{title}</div>
                <div style={{ fontSize: "0.875rem", color: C.gray500, lineHeight: 1.75 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EKİBİMİZ ══ */}
      <section style={{ background: C.navy2, padding: "5rem 2rem" }}>
        <div ref={rTeam} style={inner}>
          <div style={{ ...fade(vTeam, 0), textAlign: "center" }}>
            <div style={{ ...tag, color: C.org }}>Uzman Kadromuz</div>
            <h2 style={{ ...h2style, color: C.white, marginTop: 4 }}>Biz <span style={{ color: C.org }}>Kimiz?</span></h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 2.5rem" }}>
              Kurucumuzun uzun yıllara dayanan sahada "Kişisel Eğitmen" tecrübesiyle kurulmuş WcorpX — her uzmanımız alanında deneyimli, saha kanıtlı bir profesyoneldir.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {team.map(({ title, sub }, i) => (
              <div key={title} style={{ ...fade(vTeam, i * 0.08), background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "1.6rem 1.5rem", display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.org, marginTop: 5, flexShrink: 0 }} />
                <div>
                  <div style={{ ...sora, fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ ...fade(vTeam, 0.5), background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.18)", borderRadius: 16, padding: "2rem 2.5rem", marginTop: "2.5rem", textAlign: "center" }}>
            <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "rgba(255,255,255,0.80)" }}>
              <span style={{ color: "#fff", fontWeight: 700 }}>Platform değil. Gerçek ekip. Sahada.</span>{" "}
              Teoriyi değil, çalışan gerçeği sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section style={{ background: C.navy, padding: "5rem 2rem" }}>
        <div ref={rWhy} style={{ ...inner, maxWidth: 920, textAlign: "center" }}>
          <div style={{ ...tag, color: C.org }}>WcorpX Farkı</div>
          <h2 style={{ ...h2style, color: C.white, marginTop: 4 }}>Neden <span style={{ color: C.org }}>Biz?</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem", marginTop: "2rem" }}>
            {[
              { icon: "check",  t: "Uzman Eğitmen Kadrosu", s: "Fizyoterapist · Diyetisyen · Spor Bilimci · Nefes Terapisti" },
              { icon: "chart",  t: "Ölçülebilir Sonuçlar",  s: "Her program başında ve sonunda detaylı analiz raporu" },
              { icon: "shield", t: "Sahada Kanıtlanmış",    s: "Teoriden değil, gerçek deneyimden gelen bilgi" },
            ].map(({ icon, t, s }) => (
              <div key={t} style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 14, padding: "1.6rem 1.4rem" }}>
                <Ico d={ICONS[icon]} size={26} color={C.org} />
                <div style={{ ...sora, fontWeight: 700, fontSize: "0.92rem", color: "#fff", margin: "0.7rem 0 0.35rem" }}>{t}</div>
                <div style={{ fontSize: "0.79rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background: C.navy2, padding: "4.5rem 2rem", textAlign: "center" }}>
        <h2 style={{ ...sora, fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Şirketiniz için ücretsiz wellness analizi isteyin.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.60)", fontSize: "1rem", marginBottom: "2rem" }}>
          Sizi arayalım, ihtiyaçlarınızı dinleyelim ve size özel bir yol haritası çizelim.
        </p>
        <button style={{ ...btnOrg, fontSize: "1.05rem", padding: "1rem 2.5rem" }}>
          Ücretsiz Analiz Talep Et <Ico d={ICONS.arrow} size={20} color="#fff" />
        </button>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: C.navy, padding: "4rem 2rem 2rem" }}>
        <div style={{ ...inner, maxWidth: 1200 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>
            <div>
              <div style={{ ...sora, fontWeight: 900, fontSize: "1.5rem", color: C.org, letterSpacing: "-0.04em", marginBottom: "1rem" }}>WcorpX</div>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.78, color: "rgba(255,255,255,0.60)", maxWidth: 260 }}>
                Bilimsel ve sahaya dayalı wellness çözümleriyle çalışanlarınızın en iyi versiyonlarını ortaya çıkarıyoruz.
              </p>
            </div>
            <div>
              <div style={{ ...sora, fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", marginBottom: "1.25rem" }}>Hızlı Bağlantılar</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {["Hizmetlerimiz", "Metodolojimiz", "Ekibimiz", "İletişim"].map(l => (
                  <a key={l} href="#" style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ ...sora, fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", marginBottom: "1.25rem" }}>İletişim</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {[
                  { icon: "phone", text: "+90 530 945 89 96", sub: "Burak Koç" },
                  { icon: "phone", text: "+90 538 354 30 24", sub: "Tarık Eken" },
                  { icon: "mail",  text: "burak.koc@wcorpx.com", sub: "" },
                  { icon: "mail",  text: "tarik.eken@wcorpx.com", sub: "" },
                  { icon: "instagram", text: "@wcorpx", sub: "" },
                ].map(({ icon, text, sub }) => (
                  <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ marginTop: 2, flexShrink: 0 }}><Ico d={ICONS[icon]} size={15} color={C.org} /></div>
                    <div>
                      <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)" }}>{text}</div>
                      {sub && <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>{sub}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.30)" }}>© 2025 WcorpX. Tüm hakları saklıdır.</span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Gizlilik Politikası", "Kullanım Şartları"].map(t => (
                <a key={t} href="#" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.30)", textDecoration: "none" }}>{t}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}