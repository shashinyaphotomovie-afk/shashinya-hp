import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppHeader } from "@/components/AppHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHASHINYA | 家族写真・七五三・イベント撮影",
  description:
    "SHASHINYAは、家族写真、七五三、お宮参り、イベント撮影、企業セミナー撮影を行うフォトブランドです。自然な表情と空気感を丁寧に残します。"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
