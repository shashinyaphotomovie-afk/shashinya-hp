import Image from "next/image";

type ImagePreviewCardProps = {
  title: string;
  src: string;
  caption: string;
};

export function ImagePreviewCard({ title, src, caption }: ImagePreviewCardProps) {
  return (
    <section className="panel">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Preview</p>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="imageFrame">
        <Image src={src} alt={title} fill className="previewImage" unoptimized />
      </div>
      <p className="helperText">{caption}</p>
    </section>
  );
}
