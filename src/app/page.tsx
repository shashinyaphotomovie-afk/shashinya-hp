import Image from "next/image";

const photoMenus = [
  {
    title: "家族写真",
    description: "いつもの距離感や、ふとした笑顔を自然に残します。"
  },
  {
    title: "七五三・お宮参り",
    description: "神社でのご祈祷前後や、ご家族の節目を丁寧に撮影します。"
  },
  {
    title: "イベント・ライブ",
    description: "空気感、熱量、表情の流れを逃さず記録します。"
  },
  {
    title: "企業セミナー",
    description: "講演会、研修、プロフィール素材まで使いやすく納品します。"
  }
];

const flowItems = [
  "お問い合わせ",
  "日程と場所の確認",
  "撮影",
  "セレクト・編集",
  "オンライン納品"
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <Image
          src="/shashinya-hero.png"
          alt="神社で家族写真を撮影しているような、あたたかい雰囲気のイメージ"
          fill
          priority
          className="heroImage"
        />
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="eyebrow">SHASHINYA / Photo & Movie</p>
          <h1>小さな日常を、大きな記念日に。</h1>
          <p className="heroLead">
            家族写真、七五三、お宮参り、イベント撮影まで。自然な表情とその場の空気感を、
            未来に残る写真として丁寧にお届けします。
          </p>
          <div className="heroActions">
            <a className="primaryButton" href="#contact">
              撮影を相談する
            </a>
            <a className="secondaryButton" href="#menu">
              撮影メニューを見る
            </a>
          </div>
        </div>
      </section>

      <section className="introSection" id="about">
        <div>
          <p className="eyebrow">About</p>
          <h2>楽しいから笑うんじゃなく、笑うから楽しいんだ。</h2>
        </div>
        <p>
          SHASHINYAは、かしこまった記念写真だけではなく、会話の途中にこぼれる笑顔、
          手をつなぐ距離感、家族らしい空気まで大切にする撮影ブランドです。
          一瞬に、魂を込めてシャッターを切ります。
        </p>
      </section>

      <section className="sectionBlock" id="menu">
        <div className="sectionHeader">
          <p className="eyebrow">Menu</p>
          <h2>撮影メニュー</h2>
        </div>
        <div className="menuGrid">
          {photoMenus.map((menu) => (
            <article className="menuCard" key={menu.title}>
              <h3>{menu.title}</h3>
              <p>{menu.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sectionBlock mutedBand" id="flow">
        <div className="sectionHeader">
          <p className="eyebrow">Flow</p>
          <h2>ご依頼の流れ</h2>
        </div>
        <ol className="flowList">
          {flowItems.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section className="contactSection" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>撮影のご相談はこちら</h2>
          <p>
            撮影内容、希望日、場所がまだ未定でも大丈夫です。ご都合に合わせて、無理のない形でご提案します。
          </p>
        </div>
        <div className="contactCard">
          <p className="contactLabel">Instagram</p>
          <a href="https://www.instagram.com/shashinya_photo_movie/" target="_blank" rel="noreferrer">
            @shashinya_photo_movie
          </a>
          <p className="contactNote">
            DMに「撮影相談」と送っていただければ、日程や内容を確認いたします。
          </p>
        </div>
      </section>
    </main>
  );
}
