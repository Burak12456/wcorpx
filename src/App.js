import { useState, useEffect, useRef } from "react";

const C = {
  navy:  "#0A1628",
  navy2: "#162340",
  org:   "#F97316",
  orgBg: "rgba(249,115,22,0.10)",
  white: "#ffffff",
  gray50:  "#F8FAFC",
  gray100: "#F1F5F9",
  gray200: "#E2E8F0",
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
  transform: vis ? "translateY(0)" : "translateY(28px)",
  transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
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
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  phone:    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  mail:     "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  instagram:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z",
  send:     "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  video:    "M23 7l-7 5 7 5V7zM1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z",
  building: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  heart:    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  info:     "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8h.01M11 12h1v4h1",
  trophy:   "M8 21h8M12 17v4M7 4H4v5a8 8 0 0 0 8 8 8 8 0 0 0 8-8V4h-3M5 8h14",
  walk:     "M13 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM7 20l2-8 3 3 2-4 4 9M6 12l2-6 4 2 2 4",
};

const sora = { fontFamily: "Georgia, 'Times New Roman', serif" };
const inner = { maxWidth: 1200, margin: "0 auto" };
const tag = { display: "inline-block", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.13em", textTransform: "uppercase", color: C.org, marginBottom: 8 };
const h2style = { ...sora, fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", color: C.navy, letterSpacing: "-0.02em", marginBottom: 12 };
const btnOrg = { background: C.org, color: "#fff", ...sora, fontWeight: 700, fontSize: "1rem", padding: "0.9rem 2rem", borderRadius: 9, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" };
const btnOutl = { background: "transparent", color: C.navy, ...sora, fontWeight: 700, fontSize: "1rem", padding: "0.875rem 2rem", borderRadius: 9, border: `2px solid ${C.navy}`, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 };

// ── NAVBAR ──────────────────────────────────────────────
const Navbar = ({ page, setPage }) => {
  const [mOpen, setMOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  const links = [
    { label: "Ana Sayfa",     id: "home" },
    { label: "Hizmetlerimiz", id: "services" },
    { label: "Hakkımızda",    id: "about" },
    { label: "İletişim",      id: "contact" },
  ];

  const go = (id) => { setPage(id); setMOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.93)",
      backdropFilter: "blur(18px)",
      boxShadow: scrolled ? "0 1px 24px rgba(10,22,40,0.08)" : "none",
      transition: "all 0.3s",
    }}>
      <div style={{ ...inner, padding: "0 2rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span onClick={() => go("home")} style={{ ...sora, fontWeight: 900, fontSize: "1.5rem", letterSpacing: "-0.04em", color: C.org, cursor: "pointer" }}>
          WcorpX
        </span>
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {links.map(({ label, id }) => (
            <span key={id} onClick={() => go(id)} style={{
              fontSize: "0.88rem", fontWeight: page === id ? 700 : 500,
              color: page === id ? C.org : C.gray700,
              padding: "0.4rem 0.85rem", borderRadius: 7,
              background: page === id ? C.orgBg : "transparent",
              cursor: "pointer", transition: "all 0.2s",
            }}>{label}</span>
          ))}
          <span onClick={() => go("contact")} style={{ ...sora, background: C.org, color: "#fff", fontWeight: 700, fontSize: "0.88rem", padding: "0.6rem 1.4rem", borderRadius: 7, cursor: "pointer", marginLeft: 8 }}>
            Teklif Alın
          </span>
        </nav>
        <button onClick={() => setMOpen(!mOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer" }}>
          <Ico d={mOpen ? ICONS.x : ICONS.menu} size={24} color={C.navy} />
        </button>
      </div>
      {mOpen && (
        <div style={{ background: C.white, borderTop: `1px solid ${C.gray200}`, padding: "1.25rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {links.map(({ label, id }) => (
            <span key={id} onClick={() => go(id)} style={{ fontSize: "0.95rem", fontWeight: 500, color: C.gray700, cursor: "pointer" }}>{label}</span>
          ))}
        </div>
      )}
    </header>
  );
};

// ── FOOTER ──────────────────────────────────────────────
const Footer = ({ setPage }) => {
  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <footer style={{ background: C.navy, padding: "4rem 2rem 2rem" }}>
      <div style={{ ...inner }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>
          <div>
            <div style={{ ...sora, fontWeight: 900, fontSize: "1.5rem", color: C.org, letterSpacing: "-0.04em", marginBottom: "1rem" }}>WcorpX</div>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.78, color: "rgba(255,255,255,0.55)", maxWidth: 260 }}>
              Bilimsel ve sahaya dayalı wellness çözümleriyle çalışanlarınızın en iyi versiyonlarını ortaya çıkarıyoruz.
            </p>
          </div>
          <div>
            <div style={{ ...sora, fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", marginBottom: "1.25rem" }}>Sayfalar</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[["Ana Sayfa","home"],["Hizmetlerimiz","services"],["Hakkımızda","about"],["İletişim","contact"]].map(([l,id]) => (
                <span key={id} onClick={() => go(id)} style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", cursor: "pointer" }}>{l}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ ...sora, fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", marginBottom: "1.25rem" }}>İletişim</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { icon: "phone", text: "+90 530 945 89 96", sub: "Burak Koç", href: "tel:+905309458996" },
                { icon: "phone", text: "+90 538 354 30 24", sub: "Tarık Eken", href: "tel:+905383543024" },
                { icon: "mail",  text: "burak.koc@wcorpx.com", href: "mailto:burak.koc@wcorpx.com" },
                { icon: "mail",  text: "tarik.eken@wcorpx.com", href: "mailto:tarik.eken@wcorpx.com" },
                { icon: "instagram", text: "@wcorpx", href: "https://instagram.com/wcorpx" },
              ].map(({ icon, text, sub, href }) => (
                <a key={text} href={href} target={icon==="instagram"?"_blank":undefined} rel="noreferrer"
                  style={{ display: "flex", alignItems: "flex-start", gap: 10, textDecoration: "none" }}>
                  <div style={{ marginTop: 2 }}><Ico d={ICONS[icon]} size={14} color={C.org} /></div>
                  <div>
                    <div style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.70)" }}>{text}</div>
                    {sub && <div style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.35)" }}>{sub}</div>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.28)" }}>© 2025 WcorpX. Tüm hakları saklıdır.</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Gizlilik Politikası","Kullanım Şartları"].map(t => (
              <span key={t} style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.28)", cursor: "pointer" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ── HOME PAGE ────────────────────────────────────────────
const HomePage = ({ setPage }) => {
  const [rHero, vHero] = useInView();
  const [rStats, vStats] = useInView();
  const [rWhy, vWhy] = useInView();
  const [rEvents, vEvents] = useInView();
  const [rPrograms, vPrograms] = useInView();

  const go = (id) => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div>
      {/* HERO */}
      <section style={{ paddingTop: "9rem", paddingBottom: "7rem", paddingLeft: "2rem", paddingRight: "2rem", background: `linear-gradient(155deg, ${C.gray50} 0%, ${C.gray100} 55%, #FFF7ED 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, right: -120, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(10,22,40,.04) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div ref={rHero} style={inner}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <div style={{ ...fade(vHero, 0), display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.22)", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.74rem", fontWeight: 700, color: C.org, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "1.75rem" }}>
                <Ico d={ICONS.check} size={13} color={C.org} />
                Bilimsel & Sahada Kanıtlanmış
              </div>
              <h1 style={{ ...fade(vHero, 0.1), ...sora, fontWeight: 900, fontSize: "clamp(2rem,4vw,3.4rem)", lineHeight: 1.13, letterSpacing: "-0.035em", color: C.navy, marginBottom: "1.5rem" }}>
                Kurumsal Performansı <span style={{ color: C.org }}>Dinamik</span> Çalışanlarla Zirveye Taşıyın.
              </h1>
              <p style={{ ...fade(vHero, 0.2), fontSize: "1.05rem", lineHeight: 1.82, color: C.gray500, marginBottom: "2.5rem" }}>
                WcorpX ile şirketinizdeki stresi azaltın, çalışan bağlılığını artırın. Bilimsel temelli ve sahada kanıtlanmış bütünsel wellness çözümleri.
              </p>
              <div style={{ ...fade(vHero, 0.3), display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <button style={btnOrg} onClick={() => go("services")}>
                  Hizmetlerimizi İnceleyin <Ico d={ICONS.arrow} size={18} color="#fff" />
                </button>
                <button style={btnOutl} onClick={() => go("contact")}>
                  İletişime Geçin <Ico d={ICONS.chevron} size={18} color={C.navy} />
                </button>
              </div>
            </div>
            {/* Hero Görsel */}
            <div style={{ ...fade(vHero, 0.2), position: "relative" }}>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 64px rgba(10,22,40,0.12)" }}>
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80"
                  alt="Kurumsal wellness"
                  style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ position: "absolute", bottom: -20, left: -20, background: C.white, borderRadius: 14, padding: "1rem 1.25rem", boxShadow: "0 8px 32px rgba(10,22,40,0.10)", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: C.orgBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ico d={ICONS.trophy} size={20} color={C.org} />
                </div>
                <div>
                  <div style={{ ...sora, fontWeight: 800, fontSize: "1.1rem", color: C.navy }}>%63</div>
                  <div style={{ fontSize: "0.75rem", color: C.gray500 }}>Çalışan bağlılığı artışı</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İSTATİSTİKLER */}
      <section style={{ background: C.navy, padding: "4.5rem 2rem" }}>
        <div ref={rStats} style={inner}>
          <div style={{ ...fade(vStats, 0), textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ ...tag, color: C.org }}>Kanıtlanmış Sonuçlar</div>
            <h2 style={{ ...h2style, color: C.white, marginTop: 4 }}>Rakamlar <span style={{ color: C.org }}>Konuşuyor</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
            {[
              { v: "%63", l: "Çalışan Bağlılığı Artışı",  s: "Wellness programı uygulayan şirketler" },
              { v: "%41", l: "Devamsızlık Azalması",       s: "Program sonrası ortalama düşüş" },
              { v: "%25", l: "Verimlilik Artışı",          s: "Bütünsel wellness uygulamalarında" },
              { v: "%21", l: "Sağlık Gideri Tasarrufu",    s: "Kurumsal sağlık maliyetlerinde" },
            ].map(({ v, l, s }) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "2rem 1.5rem", textAlign: "center" }}>
                <div style={{ ...sora, fontWeight: 900, fontSize: "clamp(2rem,4vw,2.8rem)", color: C.org, letterSpacing: "-0.03em", lineHeight: 1 }}>{v}</div>
                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#fff", marginTop: "0.5rem" }}>{l}</div>
                <div style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.40)", marginTop: "0.3rem" }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONLINE & OFİSTE ETKİNLİKLER */}
      <section style={{ background: C.gray50, padding: "5rem 2rem" }}>
        <div ref={rEvents} style={inner}>
          <div style={{ ...fade(vEvents, 0), textAlign: "center", marginBottom: "3rem" }}>
            <div style={tag}>Nasıl Çalışırız?</div>
            <h2 style={h2style}>Ofiste de <span style={{ color: C.org }}>Online da</span> Yanınızdayız</h2>
            <p style={{ fontSize: "1rem", color: C.gray500, lineHeight: 1.75, maxWidth: 520, margin: "0 auto" }}>
              Çalışanlarınızın bulunduğu her yerde, istediğiniz formatta wellness deneyimi sunuyoruz.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {/* Ofiste */}
            <div style={{ ...fade(vEvents, 0.1), background: C.white, borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(10,22,40,0.07)", border: `1px solid ${C.gray200}` }}>
              <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&q=80" alt="Ofiste etkinlik" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 16, left: 20, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: C.org, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Ico d={ICONS.building} size={16} color="#fff" />
                  </div>
                  <span style={{ ...sora, fontWeight: 700, fontSize: "1rem", color: "#fff" }}>Ofiste Etkinlikler</span>
                </div>
              </div>
              <div style={{ padding: "1.75rem" }}>
                <p style={{ fontSize: "0.9rem", color: C.gray500, lineHeight: 1.75, marginBottom: "1.25rem" }}>
                  Uzman ekibimiz doğrudan şirketinize gelir. Yoga, pilates, fonksiyonel antrenman, nefes terapisi ve ergonomi seansları ofis ortamında gerçekleşir.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {["Grup dersleri & bireysel koçluk", "Masabaşı ergonomi analizi", "Açık alan & saha aktiviteleri"].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: C.navy }}>
                      <Ico d={ICONS.check} size={15} color={C.org} />{t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Online */}
            <div style={{ ...fade(vEvents, 0.2), background: C.white, borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(10,22,40,0.07)", border: `1px solid ${C.gray200}` }}>
              <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&q=80" alt="Online etkinlik" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 16, left: 20, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: C.org, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Ico d={ICONS.video} size={16} color="#fff" />
                  </div>
                  <span style={{ ...sora, fontWeight: 700, fontSize: "1rem", color: "#fff" }}>Online Etkinlikler</span>
                </div>
              </div>
              <div style={{ padding: "1.75rem" }}>
                <p style={{ fontSize: "0.9rem", color: C.gray500, lineHeight: 1.75, marginBottom: "1.25rem" }}>
                  Uzaktan çalışan ekipler veya farklı şehirlerdeki ofisler için canlı yayın dersleri ve dijital wellness programları sunuyoruz.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {["Canlı yayın grup dersleri", "Kayıtlı içerik kütüphanesi", "Dijital wellness takip & raporlama"].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: C.navy }}>
                      <Ico d={ICONS.check} size={15} color={C.org} />{t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEDEN BİZ */}
      <section style={{ background: C.navy, padding: "5rem 2rem" }}>
        <div ref={rWhy} style={{ ...inner, maxWidth: 960, textAlign: "center" }}>
          <div style={{ ...fade(vWhy, 0), ...tag, color: C.org }}>WcorpX Farkı</div>
          <h2 style={{ ...fade(vWhy, 0.05), ...h2style, color: C.white, marginTop: 4 }}>Neden <span style={{ color: C.org }}>Biz?</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem", marginTop: "2.5rem" }}>
            {[
              { icon: "check",    t: "Uzman Kadro",            s: "Fizyoterapist, diyetisyen, spor bilimci, nefes terapisti" },
              { icon: "chart",    t: "Ölçülebilir Sonuçlar",   s: "Program başında ve sonunda detaylı analiz raporu" },
              { icon: "shield",   t: "Sahada Kanıtlanmış",     s: "Teoriden değil, yıllarca süren gerçek deneyimden" },
              { icon: "activity", t: "Bütünsel Yaklaşım",      s: "Beden, zihin ve sosyal sağlığı birlikte ele alıyoruz" },
            ].map(({ icon, t, s }, i) => (
              <div key={t} style={{ ...fade(vWhy, i * 0.1), background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 14, padding: "1.75rem 1.4rem" }}>
                <Ico d={ICONS[icon]} size={26} color={C.org} />
                <div style={{ ...sora, fontWeight: 700, fontSize: "0.92rem", color: "#fff", margin: "0.8rem 0 0.4rem" }}>{t}</div>
                <div style={{ fontSize: "0.79rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WELLNESS PROGRAMLARI PREVIEW */}
      <section style={{ background: C.white, padding: "5rem 2rem" }}>
        <div ref={rPrograms} style={inner}>
          <div style={{ ...fade(vPrograms, 0), textAlign: "center", marginBottom: "3rem" }}>
            <div style={tag}>Programlarımız</div>
            <h2 style={h2style}>Şirketinize Özel <span style={{ color: C.org }}>Wellness Programları</span></h2>
            <p style={{ fontSize: "1rem", color: C.gray500, lineHeight: 1.75, maxWidth: 520, margin: "0 auto" }}>
              Her program şirketinizin ihtiyaçlarına göre özelleştiriliyor.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem" }}>
            {[
              { icon: "sun",      title: "30 Günlük Ofis Yoga Serisi",    desc: "Haftada 2 seans, 4 hafta boyunca grup dersi. Esneklik, denge ve zihin berraklığı.", tag: "Ofiste" },
              { icon: "walk",     title: "Adım Challenge",                desc: "Şirket içi adım yarışması, haftalık liderboard ve ödüllü motivasyon sistemi.", tag: "Hibrit" },
              { icon: "activity", title: "Kuvvet & Kondisyon",            desc: "8 haftalık kademeli antrenman planı. Fonksiyonel hareket ve güç gelişimi.", tag: "Ofiste" },
              { icon: "wind",     title: "Stres Yönetimi Paketi",         desc: "Nefes terapisi ve meditasyon. 4 haftalık program, online veya ofiste.", tag: "Online" },
            ].map(({ icon, title, desc, tag: t }, i) => (
              <div key={title} style={{ ...fade(vPrograms, i * 0.1), background: C.gray50, border: `1px solid ${C.gray200}`, borderRadius: 16, padding: "1.75rem", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 16, right: 16, background: t === "Online" ? C.navy : t === "Hibrit" ? "rgba(249,115,22,0.15)" : C.orgBg, color: t === "Online" ? "#fff" : C.org, fontSize: "0.7rem", fontWeight: 700, padding: "0.25rem 0.7rem", borderRadius: 100, letterSpacing: "0.06em" }}>{t}</div>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: C.orgBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Ico d={ICONS[icon]} color={C.org} />
                </div>
                <div style={{ ...sora, fontWeight: 700, fontSize: "0.97rem", color: C.navy, marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: "0.85rem", color: C.gray500, lineHeight: 1.75 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <button style={btnOrg} onClick={() => { setPage("services"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              Tüm Hizmetleri Gör <Ico d={ICONS.arrow} size={18} color="#fff" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.navy2, padding: "4.5rem 2rem", textAlign: "center" }}>
        <h2 style={{ ...sora, fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Şirketiniz için ücretsiz wellness analizi isteyin.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", marginBottom: "2rem" }}>
          Sizi arayalım, ihtiyaçlarınızı dinleyelim ve size özel bir yol haritası çizelim.
        </p>
        <button style={{ ...btnOrg, fontSize: "1.05rem", padding: "1rem 2.5rem" }} onClick={() => { setPage("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          Ücretsiz Analiz Talep Et <Ico d={ICONS.arrow} size={20} color="#fff" />
        </button>
      </section>
    </div>
  );
};

// ── SERVICES PAGE ────────────────────────────────────────
const ServicesPage = ({ setPage }) => {
  const [rHero, vHero] = useInView();
  const [rSvc, vSvc] = useInView();
  const [rProg, vProg] = useInView();
  const [rApproach, vApproach] = useInView();

  const services = [
    { icon: "users",   title: "Grup Dersleri",       desc: "Yoga, Pilates, Kuvvet, Stretching, Fonksiyonel Antrenman, Indoor Cycling ve Online seçenekleriyle ofis içinde veya açık alanda.", tags: ["Ofiste", "Online"] },
    { icon: "star",    title: "Birebir Eğitim",      desc: "Yöneticiler ve çalışanlar için kişiye özel 1:1 koçluk seansları. Kişisel eğitmen deneyimi, tam esneklik.", tags: ["Ofiste", "Online"] },
    { icon: "wind",    title: "Nefes Terapisi",      desc: "Stres ve kaygı yönetimi için kanıtlanmış nefes teknikleri ve meditasyon programları. Anlık rahatlama ve uzun vadeli dönüşüm.", tags: ["Ofiste", "Online"] },
    { icon: "coffee",  title: "Diyetisyen Desteği",  desc: "Grup seminerleri ve bireysel danışmanlıkla beslenme alışkanlıklarını dönüştürüyoruz. Sürdürülebilir, bilimsel beslenme.", tags: ["Ofiste"] },
    { icon: "monitor", title: "Masabaşı Ergonomisi", desc: "Fizyoterapistlerimiz çalışma ortamlarını analiz eder, postür bozukluklarını önleriz. Saha ve depo ekiplerine özel program.", tags: ["Ofiste"] },
    { icon: "sun",     title: "Dış Aktiviteler",     desc: "Belgrad Ormanı yürüyüşleri, Caddebostan koşuları, padel turnuvaları ve mini futbol etkinlikleriyle takım ruhunu pekiştiriyoruz.", tags: ["Ofiste"] },
  ];

  const programs = [
    { icon: "sun",      title: "30 Günlük Ofis Yoga Serisi",  desc: "Haftada 2 seans, 4 hafta boyunca grup dersi. Esneklik, denge ve zihin berraklığı için tasarlanmış kademeli program.", duration: "4 Hafta", freq: "2x/Hafta", type: "Ofiste" },
    { icon: "walk",     title: "Adım Challenge",               desc: "Şirket içi haftalık adım yarışması. Takım veya bireysel katılım, haftalık liderboard, ödüllü motivasyon sistemi.", duration: "4-8 Hafta", freq: "Sürekli", type: "Hibrit" },
    { icon: "activity", title: "Kuvvet & Kondisyon Programı",  desc: "8 haftalık kademeli antrenman planı. Fonksiyonel hareket, güç gelişimi ve postür iyileştirme odaklı.", duration: "8 Hafta", freq: "2-3x/Hafta", type: "Ofiste" },
    { icon: "wind",     title: "Stres Yönetimi Paketi",        desc: "Nefes terapisi ve meditasyon içeren 4 haftalık program. Ofiste veya online olarak uygulanabilir.", duration: "4 Hafta", freq: "2x/Hafta", type: "Online" },
  ];

  const tagColor = (t) => t === "Online" ? { bg: C.navy, color: "#fff" } : t === "Hibrit" ? { bg: "rgba(249,115,22,0.12)", color: C.org } : { bg: C.orgBg, color: C.org };

  return (
    <div>
      {/* HERO */}
      <section style={{ paddingTop: "8rem", paddingBottom: "5rem", paddingLeft: "2rem", paddingRight: "2rem", background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navy2} 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div ref={rHero} style={{ ...inner, textAlign: "center" }}>
          <div style={{ ...fade(vHero, 0), ...tag, color: C.org }}>Hizmetlerimiz</div>
          <h1 style={{ ...fade(vHero, 0.1), ...sora, fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.03em", marginTop: 8, marginBottom: "1.25rem" }}>
            Bütünsel <span style={{ color: C.org }}>Wellness Çözümleri</span>
          </h1>
          <p style={{ ...fade(vHero, 0.2), fontSize: "1.05rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
            Bedensel, zihinsel ve sosyal sağlığı birlikte ele alan kapsamlı hizmet portföyü. Uzman ağımızla sahada ve online sunuyoruz.
          </p>
        </div>
      </section>

      {/* HİZMETLER */}
      <section style={{ background: C.white, padding: "5rem 2rem" }}>
        <div ref={rSvc} style={inner}>
          <div style={{ ...fade(vSvc, 0), textAlign: "center", marginBottom: "3rem" }}>
            <div style={tag}>Ne Sunuyoruz?</div>
            <h2 style={h2style}>Tüm <span style={{ color: C.org }}>Hizmetlerimiz</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem" }}>
            {services.map(({ icon, title, desc, tags }, i) => {
              const [h, setH] = useState(false);
              return (
                <div key={title}
                  onMouseEnter={() => setH(true)}
                  onMouseLeave={() => setH(false)}
                  style={{ ...fade(vSvc, i * 0.08), background: C.white, border: `1px solid ${h ? "transparent" : C.gray200}`, borderRadius: 16, padding: "2rem", boxShadow: h ? "0 12px 40px rgba(10,22,40,0.10)" : "none", transform: h ? "translateY(-4px)" : "translateY(0)", transition: "all 0.3s", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.org, transform: h ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.3s" }} />
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 12, background: h ? C.org : C.orgBg, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.25s" }}>
                      <Ico d={ICONS[icon]} color={h ? "#fff" : C.org} />
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                      {tags.map(t => {
                        const tc = tagColor(t);
                        return <span key={t} style={{ background: tc.bg, color: tc.color, fontSize: "0.68rem", fontWeight: 700, padding: "0.22rem 0.65rem", borderRadius: 100, letterSpacing: "0.05em" }}>{t}</span>;
                      })}
                    </div>
                  </div>
                  <div style={{ ...sora, fontWeight: 700, fontSize: "1rem", color: C.navy, marginBottom: 8 }}>{title}</div>
                  <div style={{ fontSize: "0.875rem", color: C.gray500, lineHeight: 1.75 }}>{desc}</div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "2.5rem", background: C.gray50, border: `1px solid ${C.gray200}`, borderRadius: 14, padding: "1.5rem 2rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.92rem", color: C.gray500, lineHeight: 1.7 }}>
              <span style={{ fontWeight: 700, color: C.navy }}>Uzman ağımızla yürütülür.</span> Fizyoterapist, diyetisyen, yoga & pilates uzmanları ve nefes terapistlerinden oluşan profesyonel kadromuz her programı sahada uygular.
            </p>
          </div>
        </div>
      </section>

      {/* WELLNESS PROGRAMLARI */}
      <section style={{ background: C.gray50, padding: "5rem 2rem" }}>
        <div ref={rProg} style={inner}>
          <div style={{ ...fade(vProg, 0), textAlign: "center", marginBottom: "3rem" }}>
            <div style={tag}>Paketler</div>
            <h2 style={h2style}>Wellness <span style={{ color: C.org }}>Programları</span></h2>
            <p style={{ fontSize: "1rem", color: C.gray500, lineHeight: 1.75, maxWidth: 520, margin: "0 auto" }}>
              Hazır programlarımızı seçin ya da size özel bir program tasarlayalım.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
            {programs.map(({ icon, title, desc, duration, freq, type }, i) => {
              const tc = tagColor(type);
              return (
                <div key={title} style={{ ...fade(vProg, i * 0.1), background: C.white, border: `1px solid ${C.gray200}`, borderRadius: 18, padding: "2rem", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: C.orgBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Ico d={ICONS[icon]} size={24} color={C.org} />
                    </div>
                    <span style={{ background: tc.bg, color: tc.color, fontSize: "0.68rem", fontWeight: 700, padding: "0.22rem 0.7rem", borderRadius: 100 }}>{type}</span>
                  </div>
                  <div style={{ ...sora, fontWeight: 700, fontSize: "1rem", color: C.navy, marginBottom: 8 }}>{title}</div>
                  <div style={{ fontSize: "0.85rem", color: C.gray500, lineHeight: 1.75, flex: 1, marginBottom: "1.25rem" }}>{desc}</div>
                  <div style={{ display: "flex", gap: "1rem", borderTop: `1px solid ${C.gray200}`, paddingTop: "1rem" }}>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontSize: "0.72rem", color: C.gray500, marginBottom: 2 }}>Süre</div>
                      <div style={{ ...sora, fontWeight: 700, fontSize: "0.85rem", color: C.navy }}>{duration}</div>
                    </div>
                    <div style={{ width: 1, background: C.gray200 }} />
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontSize: "0.72rem", color: C.gray500, marginBottom: 2 }}>Sıklık</div>
                      <div style={{ ...sora, fontWeight: 700, fontSize: "0.85rem", color: C.navy }}>{freq}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 ADIMDA DEĞİŞİM */}
      <section style={{ background: C.white, padding: "5rem 2rem" }}>
        <div ref={rApproach} style={inner}>
          <div style={{ ...fade(vApproach, 0), textAlign: "center", marginBottom: "3rem" }}>
            <div style={tag}>Metodolojimiz</div>
            <h2 style={h2style}>3 Adımda <span style={{ color: C.org }}>Değişim</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
            {[
              { num: "01", icon: "target", title: "Derin Analiz",     desc: "Postür, mobilite, esneklik, MaxVO₂ ve vücut kompozisyonu testleriyle şirketinizin sağlık haritasını çıkarıyoruz." },
              { num: "02", icon: "zap",    title: "Program Tasarımı", desc: "Elde ettiğimiz verilerle yalnızca sizin kurumunuza özel, bilimsel temelli bir wellness programı oluşturuyoruz." },
              { num: "03", icon: "award",  title: "Sahada Uygulama",  desc: "Uzman ekibimiz ofise gelir, programı canlı olarak yürütür. Biz her adımda yanınızdayız." },
            ].map(({ num, icon, title, desc }, i) => (
              <div key={title} style={{ ...fade(vApproach, i * 0.12), background: C.gray50, border: `1px solid ${C.gray200}`, borderRadius: 16, padding: "2.25rem 2rem", position: "relative" }}>
                <div style={{ position: "absolute", top: "1.25rem", right: "1.5rem", ...sora, fontWeight: 900, fontSize: "3.5rem", color: "rgba(249,115,22,0.08)", lineHeight: 1 }}>{num}</div>
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

      {/* CTA */}
      <section style={{ background: C.navy, padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ ...sora, fontWeight: 800, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#fff", marginBottom: "1rem" }}>
          Şirketinize özel program için konuşalım.
        </h2>
        <button style={{ ...btnOrg, fontSize: "1rem", padding: "0.9rem 2.25rem" }} onClick={() => { setPage("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          İletişime Geçin <Ico d={ICONS.arrow} size={18} color="#fff" />
        </button>
      </section>
    </div>
  );
};

// ── ABOUT PAGE ───────────────────────────────────────────
const AboutPage = ({ setPage }) => {
  const [rHero, vHero] = useInView();
  const [rStory, vStory] = useInView();
  const [rTeam, vTeam] = useInView();
  const [rValues, vValues] = useInView();

  const founders = [
    {
      name: "Burak Koç",
      title: "Kurucu & Baş Antrenör",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      bio: "Yıllarca sahada kişisel antrenör olarak çalışan Burak, kurumsal dünyanın wellness ihtiyacını yakından gözlemleyerek WcorpX'i kurdu. Şirketlerin performansının çalışanların fiziksel ve zihinsel sağlığıyla doğrudan bağlantılı olduğuna inanıyor.",
      stats: [{ v: "10+", l: "Yıl Deneyim" }, { v: "500+", l: "Birebir Seans" }, { v: "20+", l: "Kurumsal Proje" }],
      phone: "+90 530 945 89 96",
      mail: "burak.koc@wcorpx.com",
    },
    {
      name: "Tarık Eken",
      title: "Kurucu & Program Direktörü",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      bio: "Spor bilimleri ve kurumsal performans alanındaki uzmanlığını birleştiren Tarık, WcorpX'in program mimarisini ve ölçülebilir sonuç sistemini tasarladı. Her programın bilimsel temele oturmasını sağlıyor.",
      stats: [{ v: "8+", l: "Yıl Deneyim" }, { v: "300+", l: "Program Tasarımı" }, { v: "15+", l: "Sektör" }],
      phone: "+90 538 354 30 24",
      mail: "tarik.eken@wcorpx.com",
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{ paddingTop: "8rem", paddingBottom: "5rem", paddingLeft: "2rem", paddingRight: "2rem", background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navy2} 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,.09) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div ref={rHero} style={{ ...inner, textAlign: "center" }}>
          <div style={{ ...fade(vHero, 0), ...tag, color: C.org }}>Hakkımızda</div>
          <h1 style={{ ...fade(vHero, 0.1), ...sora, fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.03em", marginTop: 8, marginBottom: "1.25rem" }}>
            Platform Değil. <span style={{ color: C.org }}>Gerçek Ekip.</span> Sahada.
          </h1>
          <p style={{ ...fade(vHero, 0.2), fontSize: "1.05rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
            Teoriyi değil, sahada çalışan gerçeği sunuyoruz.
          </p>
        </div>
      </section>

      {/* HİKAYE */}
      <section style={{ background: C.white, padding: "5rem 2rem" }}>
        <div ref={rStory} style={{ ...inner, maxWidth: 900 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div style={{ ...fade(vStory, 0) }}>
              <div style={tag}>Hikayemiz</div>
              <h2 style={h2style}>WcorpX <span style={{ color: C.org }}>Nasıl Doğdu?</span></h2>
              <p style={{ fontSize: "0.95rem", color: C.gray500, lineHeight: 1.85, marginBottom: "1.25rem" }}>
                Burak ve Tarık, yıllarca bireysel antrenörlük yaparak yüzlerce kişiyle çalıştı. Bu süreçte fark ettikleri bir şey vardı: Çalışanlar ofiste 8-10 saat hareketsiz oturuyor, stres birikiyor, verimlilik düşüyordu.
              </p>
              <p style={{ fontSize: "0.95rem", color: C.gray500, lineHeight: 1.85, marginBottom: "1.25rem" }}>
                Piyasadaki çözümler ya uygulama bazlıydı ya da yüzeyseldi. Gerçek, sahada uygulanan, ölçülebilir sonuç üreten bir şey yoktu. WcorpX bu boşluğu doldurmak için kuruldu.
              </p>
              <p style={{ fontSize: "0.95rem", color: C.gray500, lineHeight: 1.85 }}>
                Bugün Türkiye genelinde şirketlere özel wellness programları tasarlıyor, uzman ağımızla sahada uyguluyoruz.
              </p>
            </div>
            <div style={{ ...fade(vStory, 0.15) }}>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 16px 48px rgba(10,22,40,0.10)" }}>
                <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&q=80" alt="WcorpX hikayesi" style={{ width: "100%", height: 380, objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KURUCULAR */}
      <section style={{ background: C.gray50, padding: "5rem 2rem" }}>
        <div ref={rTeam} style={inner}>
          <div style={{ ...fade(vTeam, 0), textAlign: "center", marginBottom: "3rem" }}>
            <div style={tag}>Kurucularımız</div>
            <h2 style={h2style}>Arkamızdaki <span style={{ color: C.org }}>İnsanlar</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))", gap: "2rem" }}>
            {founders.map(({ name, title, img, bio, stats, phone, mail }, i) => (
              <div key={name} style={{ ...fade(vTeam, i * 0.15), background: C.white, border: `1px solid ${C.gray200}`, borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(10,22,40,0.06)" }}>
                <div style={{ display: "flex", gap: "1.75rem", padding: "2rem 2rem 1.5rem" }}>
                  <div style={{ width: 90, height: 90, borderRadius: 16, overflow: "hidden", flexShrink: 0, background: C.gray200 }}>
                    <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ ...sora, fontWeight: 800, fontSize: "1.2rem", color: C.navy }}>{name}</div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: C.org, marginTop: 4, marginBottom: 12 }}>{title}</div>
                    <div style={{ display: "flex", gap: "1.25rem" }}>
                      {stats.map(({ v, l }) => (
                        <div key={l}>
                          <div style={{ ...sora, fontWeight: 800, fontSize: "1.1rem", color: C.navy }}>{v}</div>
                          <div style={{ fontSize: "0.7rem", color: C.gray500 }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ padding: "0 2rem 1.5rem" }}>
                  <p style={{ fontSize: "0.88rem", color: C.gray500, lineHeight: 1.8, marginBottom: "1.25rem" }}>{bio}</p>
                  <div style={{ display: "flex", gap: "1rem", borderTop: `1px solid ${C.gray200}`, paddingTop: "1.25rem" }}>
                    <a href={`tel:${phone.replace(/\s/g,"")}`} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: C.navy, textDecoration: "none", fontWeight: 500 }}>
                      <Ico d={ICONS.phone} size={13} color={C.org} />{phone}
                    </a>
                    <a href={`mailto:${mail}`} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: C.navy, textDecoration: "none", fontWeight: 500 }}>
                      <Ico d={ICONS.mail} size={13} color={C.org} />{mail}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MİSYON & VİZYON */}
      <section style={{ background: C.navy, padding: "5rem 2rem" }}>
        <div ref={rValues} style={{ ...inner, maxWidth: 900 }}>
          <div style={{ ...fade(vValues, 0), textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ ...tag, color: C.org }}>Değerlerimiz</div>
            <h2 style={{ ...h2style, color: C.white, marginTop: 4 }}>Misyon & <span style={{ color: C.org }}>Vizyon</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[
              { icon: "heart",   title: "Misyonumuz", desc: "Türkiye'deki şirketlerin çalışan sağlığına yatırım yapmasını kolaylaştırmak. Bilimsel, sahada kanıtlanmış ve ölçülebilir wellness programlarıyla kurumsal performansı artırmak." },
              { icon: "star",    title: "Vizyonumuz", desc: "Kurumsal wellness'ın bir lüks değil, her şirketin erişebildiği bir standart haline gelmesi. Sağlıklı çalışanlar, güçlü şirketler." },
              { icon: "shield",  title: "Yaklaşımımız", desc: "Her program veri ile başlar, sahada uygulanır, sonuçları ölçülür. Teori değil, çalışan gerçek." },
              { icon: "users",   title: "Uzman Ağımız", desc: "Fizyoterapist, diyetisyen, spor bilimci, nefes terapisti ve yoga-pilates uzmanlarından oluşan seçkin bir ağ. Her uzmanlık, alanında kanıtlanmış." },
            ].map(({ icon, title, desc }, i) => (
              <div key={title} style={{ ...fade(vValues, i * 0.1), background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "2rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: C.orgBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Ico d={ICONS[icon]} size={20} color={C.org} />
                </div>
                <div style={{ ...sora, fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.75 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.navy2, padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ ...sora, fontWeight: 800, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#fff", marginBottom: "1rem" }}>
          Birlikte çalışalım.
        </h2>
        <button style={{ ...btnOrg, fontSize: "1rem", padding: "0.9rem 2.25rem" }} onClick={() => { setPage("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          İletişime Geçin <Ico d={ICONS.arrow} size={18} color="#fff" />
        </button>
      </section>
    </div>
  );
};

// ── CONTACT PAGE ─────────────────────────────────────────
const ContactPage = () => {
  const [rHero, vHero] = useInView();
  const [rMain, vMain] = useInView();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
  };

  const inp = { width: "100%", padding: "0.85rem 1rem", borderRadius: 9, border: `1.5px solid ${C.gray200}`, fontSize: "0.9rem", color: C.navy, background: C.white, outline: "none", boxSizing: "border-box", fontFamily: "'Segoe UI', system-ui, sans-serif", transition: "border-color 0.2s" };

  return (
    <div>
      <section style={{ paddingTop: "8rem", paddingBottom: "5rem", paddingLeft: "2rem", paddingRight: "2rem", background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navy2} 100%)`, position: "relative", overflow: "hidden" }}>
        <div ref={rHero} style={{ ...inner, textAlign: "center" }}>
          <div style={{ ...fade(vHero, 0), ...tag, color: C.org }}>İletişim</div>
          <h1 style={{ ...fade(vHero, 0.1), ...sora, fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.03em", marginTop: 8, marginBottom: "1.25rem" }}>
            Birlikte <span style={{ color: C.org }}>Başlayalım</span>
          </h1>
          <p style={{ ...fade(vHero, 0.2), fontSize: "1.05rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.8, maxWidth: 500, margin: "0 auto" }}>
            İlk görüşme tamamen ücretsiz. Şirketinizin ihtiyaçlarını dinler, size özel bir yol haritası sunarız.
          </p>
        </div>
      </section>

      <section style={{ background: C.gray50, padding: "5rem 2rem" }}>
        <div ref={rMain} style={{ ...inner, maxWidth: 1050 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem", alignItems: "start" }}>
            {/* Sol */}
            <div style={{ ...fade(vMain, 0) }}>
              <div style={{ ...sora, fontWeight: 700, fontSize: "1.15rem", color: C.navy, marginBottom: "2rem" }}>Bize Ulaşın</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                {[
                  { icon: "phone", label: "Burak Koç", value: "+90 530 945 89 96", href: "tel:+905309458996" },
                  { icon: "phone", label: "Tarık Eken", value: "+90 538 354 30 24", href: "tel:+905383543024" },
                  { icon: "mail",  label: "Burak Koç", value: "burak.koc@wcorpx.com", href: "mailto:burak.koc@wcorpx.com" },
                  { icon: "mail",  label: "Tarık Eken", value: "tarik.eken@wcorpx.com", href: "mailto:tarik.eken@wcorpx.com" },
                  { icon: "instagram", label: "Instagram", value: "@wcorpx", href: "https://instagram.com/wcorpx" },
                ].map(({ icon, label, value, href }) => (
                  <a key={value} href={href} target={icon==="instagram"?"_blank":undefined} rel="noreferrer"
                    style={{ display: "flex", alignItems: "flex-start", gap: 14, textDecoration: "none" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: C.orgBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Ico d={ICONS[icon]} size={17} color={C.org} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.73rem", fontWeight: 700, color: C.gray500, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: "0.9rem", color: C.navy, fontWeight: 500 }}>{value}</div>
                    </div>
                  </a>
                ))}
              </div>
              <div style={{ background: C.navy, borderRadius: 14, padding: "1.5rem 1.75rem" }}>
                <div style={{ ...sora, fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: "0.5rem" }}>Ücretsiz Keşif Görüşmesi</div>
                <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.7, margin: 0 }}>
                  İlk görüşme tamamen ücretsizdir. Şirketinizin ihtiyaçlarını dinler, size özel bir yol haritası sunarız.
                </p>
              </div>
            </div>

            {/* Sağ: Form */}
            <div style={{ ...fade(vMain, 0.1), background: C.white, borderRadius: 18, padding: "2.5rem 2rem", boxShadow: "0 4px 32px rgba(10,22,40,0.07)", border: `1px solid ${C.gray200}` }}>
              <div style={{ ...sora, fontWeight: 700, fontSize: "1.1rem", color: C.navy, marginBottom: "1.75rem" }}>Mesaj Gönderin</div>
              {sent ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.orgBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                    <Ico d={ICONS.check} size={28} color={C.org} />
                  </div>
                  <div style={{ ...sora, fontWeight: 700, fontSize: "1.2rem", color: C.navy, marginBottom: "0.5rem" }}>Mesajınız İletildi!</div>
                  <p style={{ color: C.gray500, fontSize: "0.9rem" }}>En kısa sürede sizinle iletişime geçeceğiz.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ fontSize: "0.78rem", fontWeight: 700, color: C.navy, marginBottom: "0.4rem", display: "block", letterSpacing: "0.04em" }}>Ad Soyad *</label>
                      <input required style={inp} placeholder="Adınız Soyadınız" value={form.name} onChange={e => setForm({...form,name:e.target.value})} onFocus={e=>e.target.style.borderColor=C.org} onBlur={e=>e.target.style.borderColor=C.gray200} />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.78rem", fontWeight: 700, color: C.navy, marginBottom: "0.4rem", display: "block", letterSpacing: "0.04em" }}>E-posta *</label>
                      <input required type="email" style={inp} placeholder="ornek@sirket.com" value={form.email} onChange={e => setForm({...form,email:e.target.value})} onFocus={e=>e.target.style.borderColor=C.org} onBlur={e=>e.target.style.borderColor=C.gray200} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 700, color: C.navy, marginBottom: "0.4rem", display: "block", letterSpacing: "0.04em" }}>Şirket Adı</label>
                    <input style={inp} placeholder="Şirketinizin adı" value={form.company} onChange={e => setForm({...form,company:e.target.value})} onFocus={e=>e.target.style.borderColor=C.org} onBlur={e=>e.target.style.borderColor=C.gray200} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 700, color: C.navy, marginBottom: "0.4rem", display: "block", letterSpacing: "0.04em" }}>Mesajınız *</label>
                    <textarea required rows={5} style={{...inp,resize:"vertical",lineHeight:1.65}} placeholder="Şirketinizin ihtiyaçlarını ve beklentilerinizi paylaşın..." value={form.message} onChange={e => setForm({...form,message:e.target.value})} onFocus={e=>e.target.style.borderColor=C.org} onBlur={e=>e.target.style.borderColor=C.gray200} />
                  </div>
                  <button type="submit" disabled={sending} style={{ background: sending ? C.gray200 : C.org, color: sending ? C.gray500 : "#fff", ...sora, fontWeight: 700, fontSize: "1rem", padding: "0.95rem 2rem", borderRadius: 9, border: "none", cursor: sending ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}>
                    {sending ? "Gönderiliyor..." : <><Ico d={ICONS.send} size={17} color="#fff" /> Mesaj Gönder</>}
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

// ── APP ──────────────────────────────────────────────────
export default function WcorpX() {
  const [page, setPage] = useState("home");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: C.white, color: C.navy, minHeight: "100vh" }}>
      <Navbar page={page} setPage={setPage} />
      <main style={{ paddingTop: 0 }}>
        {page === "home"     && <HomePage    setPage={setPage} />}
        {page === "services" && <ServicesPage setPage={setPage} />}
        {page === "about"    && <AboutPage   setPage={setPage} />}
        {page === "contact"  && <ContactPage />}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}
