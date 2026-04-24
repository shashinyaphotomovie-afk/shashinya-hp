export const BACKGROUND_STYLE_OPTIONS = [
  { value: "white", label: "白背景", description: "清潔感のある標準的な商品写真向け" },
  { value: "lightGray", label: "ライトグレー背景", description: "輪郭が見やすいやわらかな背景" }
] as const;

export type BackgroundStyle = (typeof BACKGROUND_STYLE_OPTIONS)[number]["value"];

export type ImageSource = {
  dataUrl: string;
  fileName: string;
  mimeType: string;
};

export type ProcessedImageResult = {
  dataUrl: string;
  fileName: string;
  mimeType: string;
  width: number;
  height: number;
  backgroundStyle: BackgroundStyle;
};
