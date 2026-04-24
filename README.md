# SHASHINYA ホームページ

家族写真、七五三、お宮参り、イベント撮影、企業セミナー撮影向けの
SHASHINYA公式ホームページです。

Cloudflare Pagesで無料公開しやすいように、Next.jsの静的書き出し設定にしています。

## ローカルで確認する

```bash
npm install
npm run dev
```

ブラウザで以下を開きます。

```text
http://localhost:3000
```

## 公開用ファイルを作る

```bash
npm run build
```

ビルドに成功すると、`out` フォルダが作られます。
Cloudflare Pagesでは、この `out` フォルダの中身が公開用サイトになります。

## Cloudflare Pagesで無料公開する手順

1. GitHubにこのプロジェクトをアップロードします。
2. Cloudflareにログインします。
3. 左メニューから「Workers & Pages」を開きます。
4. 「Create application」から「Pages」を選びます。
5. GitHubリポジトリを選びます。
6. ビルド設定を以下にします。

```text
Framework preset: Next.js
Build command: npm run build
Build output directory: out
```

7. 「Save and Deploy」を押します。

## 主な編集場所

```text
src/app/page.tsx        トップページの文章と構成
src/app/globals.css     デザイン全体
src/components/AppHeader.tsx  ヘッダーのメニュー
public/shashinya-hero.png     トップのメイン画像
```

## 今後の改善案

- 撮影料金表を追加する
- 撮影実績ギャラリーを追加する
- お問い合わせフォームを追加する
- Googleカレンダーや予約フォームと連携する
- 独自ドメインを設定する
