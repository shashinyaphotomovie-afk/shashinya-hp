import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["WORKS", "SERVICE", "ABOUT", "CONTACT"];

const SERVICES = [
  { id: "01", title: "FAMILY\nPHOTO", ja: "家族・子ども写真", desc: "日常の一瞬を永遠に。自然体の笑顔を引き出す撮影。" },
  { id: "02", title: "七五三・\nお宮参り", ja: "記念行事", desc: "大切な節目を格調ある一枚に。四国全域対応。" },
  { id: "03", title: "NEW\nBORN", ja: "ニューボーン", desc: "生まれたての奇跡の瞬間を、やわらかく記録する。" },
  { id: "04", title: "LIVE\nMUSIC", ja: "ライブ・イベント", desc: "熱量と躍動感、その場の空気ごと切り取る。" },
  { id: "05", title: "SCHOOL\nEVENT", ja: "学校・園行事", desc: "えんフォト対応。子どもたちの輝く瞬間を逃さない。" },
  { id: "06", title: "CORPORATE", ja: "企業・セミナー", desc: "ブランドイメージを高める、プロフェッショナルな一枚。" },
];

const WORDS = [
  "小さな日常を大きな記念日に。",
  "笑うから楽しいんだ。",
  "一瞬に、魂を込めてシャッターを切る。",
];

const AREAS = ["徳島", "香川", "高知", "愛媛", "兵庫（一部）", "岡山（一部）"];

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`;

export default function Shashinya() {
  const [loaded, setLoaded] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx(i => (i + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Serif+JP:wght@300;400;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #0a0a0a; color: #f0ede8; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #0a0a0a; }
    ::-webkit-scrollbar-thumb { background: #c8b89a; }

    .nav-link {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 14px;
      letter-spacing: 0.25em;
      color: rgba(240,237,232,0.6);
      text-decoration: none;
      transition: color 0.3s;
      cursor: pointer;
      background: none; border: none;
    }
    .nav-link:hover { color: #c8b89a; }

    .hero-word {
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .service-card {
      border: 1px solid rgba(255,255,255,0.08);
      padding: 28px 24px;
      transition: border-color 0.3s, background 0.3s;
      cursor: default;
    }
    .service-card:hover {
      border-color: rgba(200,184,154,0.4);
      background: rgba(200,184,154,0.04);
    }

    .cta-btn {
      display: inline-block;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 15px;
      letter-spacing: 0.3em;
      color: #0a0a0a;
      background: #c8b89a;
      padding: 16px 48px;
      text-decoration: none;
      transition: background 0.3s, transform 0.2s;
      cursor: pointer;
      border: none;
    }
    .cta-btn:hover { background: #f0ede8; transform: translateY(-2px); }

    .cta-btn-outline {
      display: inline-block;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 15px;
      letter-spacing: 0.3em;
      color: #c8b89a;
      background: transparent;
      padding: 14px 40px;
      text-decoration: none;
      border: 1px solid #c8b89a;
      transition: all 0.3s;
      cursor: pointer;
    }
    .cta-btn-outline:hover { background: #c8b89a; color: #0a0a0a; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes lineExpand {
      from { width: 0; }
      to { width: 100%; }
    }
    .fade-up-1 { animation: fadeUp 0.9s ease forwards; opacity: 0; animation-delay: 0.2s; }
    .fade-up-2 { animation: fadeUp 0.9s ease forwards; opacity: 0; animation-delay: 0.5s; }
    .fade-up-3 { animation: fadeUp 0.9s ease forwards; opacity: 0; animation-delay: 0.8s; }
    .fade-up-4 { animation: fadeUp 0.9s ease forwards; opacity: 0; animation-delay: 1.1s; }
    .fade-in { animation: fadeIn 1.5s ease forwards; opacity: 0; animation-delay: 0.3s; }
  `;

  return (
    <div style={{ fontFamily: "'Noto Serif JP', serif", background: "#0a0a0a", color: "#f0ede8", minHeight: "100vh", position: "relative" }}>
      <style>{css}</style>

      {/* Grain overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: grain, backgroundRepeat: "repeat", backgroundSize: "256px",
        opacity: 0.4,
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 60 ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(12px)" : "none",
        transition: "background 0.4s, backdrop-filter 0.4s",
        borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 22, letterSpacing: "0.2em", color: "#f0ede8",
        }}>
          SHASHINYA
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {NAV_ITEMS.map(n => (
            <button key={n} className="nav-link"
              onClick={() => document.getElementById(n.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}>
              {n}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} id="top" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "0 32px 64px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: "radial-gradient(ellipse at 70% 30%, rgba(60,50,40,0.5) 0%, rgba(10,10,10,0) 60%), radial-gradient(ellipse at 20% 80%, rgba(30,30,50,0.3) 0%, transparent 50%)",
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(80px, 20vw, 240px)",
          color: "rgba(255,255,255,0.025)",
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
          userSelect: "none",
          zIndex: 0,
        }}>
          PHOTO
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          {loaded && <>
            <div className="fade-up-1" style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(56px, 12vw, 130px)",
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              marginBottom: 24,
            }}>
              CAPTURING<br />
              <span style={{ color: "#c8b89a" }}>LIFE'S</span><br />
              MOMENTS
            </div>

            <div className="fade-up-2" style={{
              width: 60, height: 1, background: "#c8b89a", marginBottom: 20,
            }} />

            <div className="fade-up-3" style={{
              fontSize: 13, color: "rgba(240,237,232,0.6)", letterSpacing: "0.15em",
              marginBottom: 8,
            }}>
              {WORDS[wordIdx]}
            </div>

            <div className="fade-up-4" style={{
              display: "flex", alignItems: "center", gap: 24, marginTop: 40,
            }}>
              <button className="cta-btn"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                CONTACT
              </button>
              <button className="cta-btn-outline"
                onClick={() => document.getElementById("service")?.scrollIntoView({ behavior: "smooth" })}>
                SERVICE
              </button>
            </div>

            <div className="fade-up-4" style={{
              marginTop: 48, display: "flex", gap: 16, flexWrap: "wrap",
            }}>
              {AREAS.map(a => (
                <span key={a} style={{
                  fontSize: 10, letterSpacing: "0.2em",
                  color: "rgba(240,237,232,0.35)",
                  borderLeft: "1px solid rgba(200,184,154,0.3)",
                  paddingLeft: 10,
                }}>{a}</span>
              ))}
            </div>
          </>}
        </div>

        <div style={{
          position: "absolute", bottom: 32, right: 32,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: 0.4,
        }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 10, letterSpacing: "0.3em",
            writingMode: "vertical-rl",
          }}>SCROLL</div>
          <div style={{ width: 1, height: 40, background: "#c8b89a" }} />
        </div>
      </section>

      {/* WORKS */}
      <section id="works" style={{ padding: "100px 32px", position: "relative", zIndex: 1 }}>
        <SectionLabel label="WORKS" ja="撮影実績" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "240px 240px",
          gap: 3,
          marginTop: 40,
        }}>
          {[
            { span: "1/3", color: "#1a1510", label: "FAMILY", sub: "家族写真" },
            { span: "3/4", color: "#0e1520", label: "LIVE", sub: "ライブ" },
            { span: "1/2", color: "#150e10", label: "七五三", sub: "記念行事" },
            { span: "2/4", color: "#101518", label: "NEWBORN", sub: "ニューボーン" },
          ].map((w, i) => (
            <div key={i} style={{
              gridColumn: w.span,
              background: w.color,
              display: "flex", flexDirection: "column",
              justifyContent: "flex-end", padding: 20,
              border: "1px solid rgba(255,255,255,0.04)",
              transition: "border-color 0.3s",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: grain, backgroundRepeat: "repeat", backgroundSize: "128px",
                opacity: 0.3,
              }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 28, letterSpacing: "0.1em",
                  color: "rgba(200,184,154,0.8)",
                }}>{w.label}</div>
                <div style={{ fontSize: 11, color: "rgba(240,237,232,0.4)", letterSpacing: "0.15em" }}>
                  {w.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{
          textAlign: "center", marginTop: 24,
          fontSize: 11, color: "rgba(240,237,232,0.3)", letterSpacing: "0.15em",
        }}>
          ※ 実際の撮影写真を入れることで完成します
        </p>
      </section>

      {/* SERVICE */}
      <section id="service" style={{ padding: "100px 32px", position: "relative", zIndex: 1 }}>
        <SectionLabel label="SERVICE" ja="撮影メニュー" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 1,
          marginTop: 40,
        }}>
          {SERVICES.map(s => (
            <div key={s.id} className="service-card">
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 10, letterSpacing: "0.3em",
                color: "#c8b89a", marginBottom: 12,
              }}>{s.id}</div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28, lineHeight: 1.1, letterSpacing: "0.05em",
                color: "#f0ede8", marginBottom: 8,
                whiteSpace: "pre-line",
              }}>{s.title}</div>
              <div style={{ fontSize: 11, color: "rgba(240,237,232,0.4)", marginBottom: 12, letterSpacing: "0.1em" }}>
                {s.ja}
              </div>
              <div style={{ width: 24, height: 1, background: "#c8b89a", marginBottom: 12 }} />
              <div style={{ fontSize: 12, color: "rgba(240,237,232,0.6)", lineHeight: 1.8 }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 60,
          border: "1px solid rgba(200,184,154,0.3)",
          padding: "40px 36px",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: -12, left: 32,
            background: "#0a0a0a", padding: "0 12px",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 11, letterSpacing: "0.3em", color: "#c8b89a",
          }}>
            SET PLAN
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            撮影 × HP制作 セットプラン
          </div>
          <div style={{ fontSize: 12, color: "rgba(240,237,232,0.5)", marginBottom: 24, lineHeight: 1.8 }}>
            撮影でお届りした写真をそのままHPに活用。<br />
            写真・デザイン・制作をワンストップでお任せいただけます。
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { plan: "A PLAN", desc: "撮影 + LP（1P）", price: "¥90,000〜" },
              { plan: "B PLAN", desc: "撮影 + コーポレートHP", price: "¥150,000〜" },
            ].map(p => (
              <div key={p.plan} style={{
                flex: "1 1 200px",
                background: "rgba(200,184,154,0.06)",
                border: "1px solid rgba(200,184,154,0.2)",
                padding: "20px 24px",
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 11, letterSpacing: "0.3em", color: "#c8b89a", marginBottom: 6,
                }}>{p.plan}</div>
                <div style={{ fontSize: 13, color: "rgba(240,237,232,0.7)", marginBottom: 10 }}>{p.desc}</div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 28, letterSpacing: "0.05em", color: "#f0ede8",
                }}>{p.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 32px", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center",
        }}>
          <div>
            <SectionLabel label="ABOUT" ja="について" />
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 8vw, 80px)",
              lineHeight: 0.95, letterSpacing: "-0.01em",
              marginTop: 32, marginBottom: 24,
            }}>
              SHIN<br /><span style={{ color: "#c8b89a" }}>SHASHINYA</span>
            </div>
            <div style={{ width: 40, height: 1, background: "#c8b89a", marginBottom: 24 }} />
            <p style={{ fontSize: 13, lineHeight: 2, color: "rgba(240,237,232,0.7)", marginBottom: 16 }}>
              徳島県藍住町を拠点に活動するフォトグラファー。<br />
              家族写真・記念行事・ライブ・企業撮影まで、四国全域＋近畿・中国地方をカバー。
            </p>
            <p style={{ fontSize: 13, lineHeight: 2, color: "rgba(240,237,232,0.7)", marginBottom: 24 }}>
              子どもが自然に笑顔になる独自のアプローチで、<br />
              「撮られている」ではなく「生きている瞬間」を記録します。
            </p>
            <div style={{ fontSize: 12, color: "rgba(200,184,154,0.7)", letterSpacing: "0.15em" }}>
              @shashinya_photo_movie
            </div>
          </div>
          <div style={{
            background: "#111",
            aspectRatio: "3/4",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(255,255,255,0.15)",
            fontSize: 11, letterSpacing: "0.2em",
          }}>
            PHOTO HERE
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 32px 80px", position: "relative", zIndex: 1 }}>
        <div style={{
          maxWidth: 600, margin: "0 auto", textAlign: "center",
        }}>
          <SectionLabel label="CONTACT" ja="お問い合わせ" center />
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(36px, 6vw, 64px)",
            lineHeight: 1, marginTop: 32, marginBottom: 24,
            letterSpacing: "0.02em",
          }}>
            LET'S CREATE<br />
            <span style={{ color: "#c8b89a" }}>TOGETHER</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 2, color: "rgba(240,237,232,0.55)", marginBottom: 40 }}>
            撮影・HP制作のご相談、お見積りはお気軽にどうぞ。<br />
            セットプランのご相談も大歓迎です。
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="cta-btn">
              INSTAGRAM DM
            </button>
            <button className="cta-btn-outline">
              LINE / TEL
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "24px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 16, letterSpacing: "0.2em", color: "rgba(240,237,232,0.4)",
        }}>
          SHASHINYA
        </div>
        <div style={{ fontSize: 10, color: "rgba(240,237,232,0.2)", letterSpacing: "0.15em" }}>
          © 2025 SHASHINYA. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ label, ja, center = false }) {
  return (
    <div style={{ textAlign: center ? "center" : "left" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 16,
      }}>
        {!center && <div style={{ width: 32, height: 1, background: "#c8b89a" }} />}
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 11, letterSpacing: "0.4em", color: "#c8b89a",
        }}>{label}</div>
        {center && <div style={{ width: 32, height: 1, background: "#c8b89a" }} />}
      </div>
      <div style={{
        fontSize: 11, color: "rgba(240,237,232,0.3)", letterSpacing: "0.2em",
        marginTop: 4, marginLeft: center ? 0 : 48,
      }}>{ja}</div>
    </div>
  );
}
