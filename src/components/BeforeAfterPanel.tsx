import Image from "next/image";

type BeforeAfterPanelProps = {
  beforeSrc: string;
  afterSrc: string;
};

export function BeforeAfterPanel({ beforeSrc, afterSrc }: BeforeAfterPanelProps) {
  return (
    <section className="panel">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Compare</p>
          <h2>処理前 / 処理後</h2>
        </div>
      </div>
      <div className="compareGrid">
        <article className="compareCard">
          <span className="compareLabel">Before</span>
          <div className="compareImageWrap">
            <Image src={beforeSrc} alt="処理前画像" fill className="previewImage" unoptimized />
          </div>
        </article>
        <article className="compareCard">
          <span className="compareLabel">After</span>
          <div className="compareImageWrap">
            <Image src={afterSrc} alt="処理後画像" fill className="previewImage" unoptimized />
          </div>
        </article>
      </div>
    </section>
  );
}
