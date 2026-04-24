"use client";

import { useRef, useState } from "react";

type UploadDropzoneProps = {
  onSelectFile: (file: File) => void;
  disabled?: boolean;
};

export function UploadDropzone({ onSelectFile, disabled = false }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | null) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      window.alert("画像ファイルを選択してください。");
      return;
    }

    onSelectFile(file);
  };

  return (
    <div
      className={`dropzone ${isDragging ? "dragging" : ""}`}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        handleFile(event.dataTransfer.files[0] ?? null);
      }}
    >
      <input
        ref={inputRef}
        className="srOnly"
        type="file"
        accept="image/*"
        disabled={disabled}
        onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
      />
      <p className="eyebrow">Upload</p>
      <h2>商品画像を追加</h2>
      <p className="dropzoneText">
        画像をここにドロップするか、ボタンから選択してください。PNG、JPEG、WebPに対応しています。
      </p>
      <div className="dropzoneActions">
        <button type="button" className="primaryButton" onClick={() => inputRef.current?.click()} disabled={disabled}>
          画像を選ぶ
        </button>
        <span className="dropzoneHint">最大1枚を編集</span>
      </div>
    </div>
  );
}
