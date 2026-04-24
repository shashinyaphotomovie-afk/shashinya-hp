"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { BeforeAfterPanel } from "@/components/BeforeAfterPanel";
import { ImagePreviewCard } from "@/components/ImagePreviewCard";
import { StyleSelector } from "@/components/StyleSelector";
import { downloadDataUrl } from "@/lib/download";
import { clearImageSession, loadImageFromSession } from "@/lib/imageSession";
import { processImage } from "@/services/imageProcessor";
import type { BackgroundStyle, ImageSource, ProcessedImageResult } from "@/types/image";

export function EditorClient() {
  const [sourceImage, setSourceImage] = useState<ImageSource | null>(null);
  const [processedImage, setProcessedImage] = useState<ProcessedImageResult | null>(null);
  const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>("white");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const storedImage = loadImageFromSession();
    setSourceImage(storedImage);
  }, []);

  const handleProcess = () => {
    if (!sourceImage) {
      setErrorMessage("先にトップページから画像を選択してください。");
      return;
    }

    setErrorMessage("");
    startTransition(async () => {
      try {
        const nextImage = await processImage(sourceImage.dataUrl, backgroundStyle, sourceImage.fileName);
        setProcessedImage(nextImage);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "背景処理に失敗しました。画像を変えてもう一度お試しください。"
        );
      }
    });
  };

  if (!sourceImage) {
    return (
      <section className="emptyState">
        <p className="eyebrow">Editor</p>
        <h1>編集中の画像がありません</h1>
        <p className="helperText">トップページから商品画像を1枚選ぶと、この編集画面で背景を整えられます。</p>
        <Link href="/" className="primaryButton">
          トップへ戻る
        </Link>
      </section>
    );
  }

  return (
    <div className="editorLayout">
      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Editor</p>
            <h1>背景を整える</h1>
          </div>
          <p className="helperText">
            商品の輪郭を残しながら、背景をメルカリ出品向けのシンプルな見た目に整えます。
          </p>
        </div>

        <div className="controlSection">
          <div>
            <h2 className="sectionTitle">背景スタイル</h2>
            <StyleSelector value={backgroundStyle} onChange={setBackgroundStyle} />
          </div>

          <div className="actionRow">
            <button type="button" className="primaryButton" onClick={handleProcess} disabled={isPending}>
              {isPending ? "処理中..." : processedImage ? "再処理する" : "背景処理を実行"}
            </button>
            <button
              type="button"
              className="secondaryButton"
              onClick={() => {
                clearImageSession();
                window.location.href = "/";
              }}
            >
              別の画像を選ぶ
            </button>
            <button
              type="button"
              className="secondaryButton"
              disabled={!processedImage}
              onClick={() => {
                if (!processedImage) {
                  return;
                }

                downloadDataUrl(processedImage.dataUrl, processedImage.fileName);
              }}
            >
              保存する
            </button>
          </div>

          {errorMessage ? <p className="errorMessage">{errorMessage}</p> : null}
        </div>
      </section>

      <div className="previewGrid">
        <ImagePreviewCard title="元画像" src={sourceImage.dataUrl} caption="アップロードした元の商品画像です。" />
        <ImagePreviewCard
          title="処理後画像"
          src={processedImage?.dataUrl ?? sourceImage.dataUrl}
          caption={
            processedImage
              ? "選択した背景スタイルで整えた画像です。"
              : "背景処理を実行すると、ここに結果が表示されます。"
          }
        />
      </div>

      {processedImage ? <BeforeAfterPanel beforeSrc={sourceImage.dataUrl} afterSrc={processedImage.dataUrl} /> : null}
    </div>
  );
}
