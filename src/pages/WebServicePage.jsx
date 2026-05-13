import { useState } from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    id: "simple",
    name: "シンプルプラン",
    price: "80,000",
    unit: "〜",
    tag: "スタート向け",
    tagColor: "#b8a898",
    desc: "まず一歩踏み出したい方へ",
    features: [
      "ランディングページ 1ページ",
      "スマートフォン対応",
      "お問い合わせフォーム設置",
      "Googleアナリティクス設定",
      "公開後 1ヶ月サポート",
    ],
    photo: false,
  },
  {
    id: "standard",
    name: "スタンダードプラン",
    price: "150,000",
    unit: "〜",
    tag: "最人気",
    tagColor: "#c8a97e",
    desc: "撮影とセットで最大効果",
    features: [
      "ランディングページ 1ページ",
      "プロ写真撮影（半日）込み",
      "スマートフォン対応",
      "お問い合わせフォーム設置",
      "Googleアナリティクス設定",
      "SNS用バナー 3点",
      "公開後 3ヶ月サポート",
    ],
    photo: true,
    highlight: true,
  },
  {
    id: "full",
    name: "フルサポートプラン",
    price: "応相談",
    unit: "",
    tag: "法人・店舗向け",
    tagColor: "#7a9e8c",
    desc: "制作から運用まで一任",
    features: [
      "複数ページWebサイト",
      "プロ写真撮影（1日）込み",
      "スマートフォン対応",
      "予約・決済システム連携",
      "SEO基本設定",
      "SNS運用サポート（月額）",
      "継続サポート契約",
    ],
    photo: true,
  },
];

const flow = [
  { num: "01", title: "ヒアリング", desc: "お客様のビジョン・ターゲット・目標をじっくりお聞きします" },
  { num: "02", title: "撮影", desc: "SHASHINYA が魂を込めてシャッターを切ります" },
  { num: "03", title: "デザイン提案", desc: "写真に合わせてブランドに最適なデザインをご提案" },
  { num: "04", title: "制作・公開", desc: "最短 2 週間で本番環境へリリース" },
  { num: "05", title: "サポート", desc: "公開後も継続してご支援。修正・更新もお任せください" },
];

const CONTACT_URL = "https://www.instagram.com/shashinya_photo_movie/";

export default function WebServicePage() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={styles.page}>
      <div style={styles.grain} />

      {/* Top bar */}
      <nav style={styles.topbar}>
        <Link to="/" style={styles.brand}>SHASHINYA</Link>
        <Link to="/" style={styles.backLink}>← HOME</Link>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <p style={styles.eyebrow}>Web Production Service</p>
          <h1 style={styles.heroTitle}>
            写真が、言葉が、<br />
            あなたのビジネスを動かす。
          </h1>
          <p style={styles.heroSub}>
            SHASHINYA のプロ撮影とランディングページ制作を<br />
            ひとつのパッケージで。印象を、結果に変えます。
          </p>
          <a href="#contact" style={styles.heroCta}>
            まずは無料相談
          </a>
        </div>
        <div style={styles.heroAccent} />
      </section>

      {/* Why */}
      <section style={styles.section}>
        <div style={styles.container}>
          <p style={styles.sectionLabel}>Why SHASHINYA Web</p>
          <h2 style={styles.sectionTitle}>写真家が作るWebサイトは、違います。</h2>
          <div style={styles.whyGrid}>
            {[
              {
                icon: "📸",
                title: "素材から違う",
                desc: "ストック写真ゼロ。あなたの現場・商品・スタッフを撮り下ろし。見た瞬間に「本物」と伝わります。",
              },
              {
                icon: "⚡",
                title: "スピードが違う",
                desc: "AI設計で最短 2 週間で公開。アイデアから集客開始まで一気に駆け抜けます。",
              },
              {
                icon: "🎯",
                title: "目的が違う",
                desc: "「綺麗なサイト」より「問い合わせが来るサイト」。CTA・導線設計まで責任を持って作ります。",
              },
            ].map((item) => (
              <div key={item.title} style={styles.whyCard}>
                <span style={styles.whyIcon}>{item.icon}</span>
                <h3 style={styles.whyCardTitle}>{item.title}</h3>
                <p style={styles.whyCardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section style={{ ...styles.section, background: "rgba(255,255,255,0.02)" }}>
        <div style={styles.container}>
          <p style={styles.sectionLabel}>Flow</p>
          <h2 style={styles.sectionTitle}>制作の流れ</h2>
          <div style={styles.flowWrap}>
            {flow.map((step, i) => (
              <div key={step.num} style={styles.flowItem}>
                <div style={styles.flowNum}>{step.num}</div>
                {i < flow.length - 1 && <div style={styles.flowLine} />}
                <div style={styles.flowContent}>
                  <p style={styles.flowTitle}>{step.title}</p>
                  <p style={styles.flowDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section style={styles.section}>
        <div style={styles.container}>
          <p style={styles.sectionLabel}>Plans</p>
          <h2 style={styles.sectionTitle}>料金プラン</h2>
          <p style={styles.planNote}>※ 表示価格はすべて税別。詳細はお気軽にご相談ください。</p>
          <div style={styles.planGrid}>
            {plans.map((plan) => (
              <div
                key={plan.id}
                style={{
                  ...styles.planCard,
                  ...(plan.highlight ? styles.planCardHL : {}),
                  ...(hovered === plan.id ? styles.planCardHover : {}),
                }}
                onMouseEnter={() => setHovered(plan.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{ ...styles.planTag, background: plan.tagColor + "22", color: plan.tagColor }}>
                  {plan.tag}
                </div>
                <h3 style={styles.planName}>{plan.name}</h3>
                <p style={styles.planDesc}>{plan.desc}</p>
                <div style={styles.planPrice}>
                  <span style={styles.planPriceNum}>¥{plan.price}</span>
                  {plan.unit && <span style={styles.planPriceUnit}>{plan.unit}</span>}
                </div>
                {plan.photo && (
                  <div style={styles.planPhotoTag}>📸 撮影費込み</div>
                )}
                <ul style={styles.planList}>
                  {plan.features.map((f) => (
                    <li key={f} style={styles.planListItem}>
                      <span style={styles.planCheck}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" style={styles.planCta}>
                  このプランで相談する
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={styles.ctaSection}>
        <div style={styles.container}>
          <p style={styles.eyebrow}>Contact</p>
          <h2 style={styles.ctaTitle}>まずは、話しましょう。</h2>
          <p style={styles.ctaSub}>
            お見積もり・ご相談は無料です。<br />
            どんな小さな疑問でも、お気軽にどうぞ。
          </p>
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" style={styles.ctaBtn}>
            Instagram DM で相談する
          </a>
        </div>
      </section>
    </div>
  );
}

const C = {
  bg: "#0e0d0c",
  surface: "#161513",
  border: "rgba(255,255,255,0.07)",
  text: "#ede9e3",
  muted: "#7a7570",
  accent: "#c8a97e",
  accentDim: "rgba(200,169,126,0.12)",
};

const styles = {
  page: {
    background: C.bg,
    color: C.text,
    fontFamily: "'Noto Serif JP', 'Georgia', serif",
    minHeight: "100vh",
    position: "relative",
    overflowX: "hidden",
  },
  grain: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
    pointerEvents: "none",
    zIndex: 0,
  },
  topbar: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    background: "rgba(14,13,12,0.85)",
    backdropFilter: "blur(10px)",
    borderBottom: `1px solid ${C.border}`,
  },
  brand: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 20,
    letterSpacing: "0.2em",
    color: C.text,
    textDecoration: "none",
  },
  backLink: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    letterSpacing: "0.15em",
    color: C.muted,
    textDecoration: "none",
  },
  hero: {
    position: "relative",
    padding: "120px 24px 100px",
    borderBottom: `1px solid ${C.border}`,
    overflow: "hidden",
  },
  heroInner: {
    position: "relative",
    maxWidth: 760,
    margin: "0 auto",
    zIndex: 1,
  },
  heroAccent: {
    position: "absolute",
    top: -120,
    right: -120,
    width: 480,
    height: 480,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(200,169,126,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  eyebrow: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    letterSpacing: "0.2em",
    color: C.accent,
    marginBottom: 24,
    textTransform: "uppercase",
  },
  heroTitle: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 400,
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
    marginBottom: 24,
    color: C.text,
  },
  heroSub: {
    fontSize: 16,
    lineHeight: 1.9,
    color: C.muted,
    marginBottom: 40,
  },
  heroCta: {
    display: "inline-block",
    padding: "14px 36px",
    background: C.accent,
    color: "#0e0d0c",
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    letterSpacing: "0.1em",
    textDecoration: "none",
    borderRadius: 2,
  },
  section: {
    padding: "80px 24px",
    position: "relative",
    zIndex: 1,
  },
  container: {
    maxWidth: 960,
    margin: "0 auto",
  },
  sectionLabel: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    letterSpacing: "0.2em",
    color: C.accent,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
    fontWeight: 400,
    marginBottom: 48,
    color: C.text,
    letterSpacing: "-0.01em",
  },
  whyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
  },
  whyCard: {
    padding: 32,
    border: `1px solid ${C.border}`,
    borderRadius: 4,
    background: C.surface,
  },
  whyIcon: { fontSize: 28, display: "block", marginBottom: 16 },
  whyCardTitle: { fontSize: 18, fontWeight: 500, marginBottom: 12, color: C.text },
  whyCardDesc: { fontSize: 14, lineHeight: 1.8, color: C.muted },
  flowWrap: { display: "flex", flexDirection: "column", gap: 0 },
  flowItem: { display: "flex", alignItems: "flex-start", gap: 24, position: "relative" },
  flowNum: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    color: C.accent,
    letterSpacing: "0.1em",
    minWidth: 28,
    paddingTop: 2,
  },
  flowLine: {
    position: "absolute",
    left: 13,
    top: 28,
    width: 1,
    height: 40,
    background: C.border,
  },
  flowContent: { paddingBottom: 40 },
  flowTitle: { fontSize: 16, fontWeight: 500, marginBottom: 6, color: C.text },
  flowDesc: { fontSize: 14, lineHeight: 1.7, color: C.muted },
  planNote: {
    fontSize: 12,
    color: C.muted,
    marginBottom: 32,
    marginTop: -24,
    fontFamily: "'Courier New', monospace",
  },
  planGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
    alignItems: "start",
  },
  planCard: {
    padding: 32,
    border: `1px solid ${C.border}`,
    borderRadius: 4,
    background: C.surface,
    transition: "border-color 0.2s, transform 0.2s",
  },
  planCardHL: { border: `1px solid ${C.accent}`, background: C.accentDim },
  planCardHover: { transform: "translateY(-4px)", borderColor: C.accent },
  planTag: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 2,
    fontSize: 11,
    letterSpacing: "0.1em",
    fontFamily: "'Courier New', monospace",
    marginBottom: 16,
  },
  planName: { fontSize: 18, fontWeight: 500, marginBottom: 6, color: C.text },
  planDesc: { fontSize: 13, color: C.muted, marginBottom: 20, lineHeight: 1.6 },
  planPrice: { display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 },
  planPriceNum: { fontSize: 28, fontFamily: "'Courier New', monospace", color: C.accent },
  planPriceUnit: { fontSize: 14, color: C.muted },
  planPhotoTag: {
    fontSize: 12,
    color: "#7a9e8c",
    marginBottom: 20,
    padding: "4px 10px",
    background: "rgba(122,158,140,0.1)",
    display: "inline-block",
    borderRadius: 2,
    fontFamily: "'Courier New', monospace",
  },
  planList: { listStyle: "none", padding: 0, margin: "0 0 28px" },
  planListItem: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    fontSize: 13,
    color: C.muted,
    padding: "7px 0",
    borderBottom: `1px solid ${C.border}`,
    lineHeight: 1.6,
  },
  planCheck: { color: C.accent, fontFamily: "'Courier New', monospace", flexShrink: 0 },
  planCta: {
    display: "block",
    textAlign: "center",
    padding: "12px",
    border: `1px solid ${C.border}`,
    borderRadius: 2,
    fontSize: 13,
    color: C.text,
    textDecoration: "none",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.05em",
  },
  ctaSection: {
    padding: "100px 24px",
    borderTop: `1px solid ${C.border}`,
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  ctaTitle: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 400,
    marginBottom: 20,
    color: C.text,
    letterSpacing: "-0.01em",
  },
  ctaSub: { fontSize: 15, lineHeight: 1.9, color: C.muted, marginBottom: 40 },
  ctaBtn: {
    display: "inline-block",
    padding: "16px 48px",
    background: C.accent,
    color: "#0e0d0c",
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    letterSpacing: "0.1em",
    textDecoration: "none",
    borderRadius: 2,
  },
};
