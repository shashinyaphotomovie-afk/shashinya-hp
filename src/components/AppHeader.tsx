import Link from "next/link";

export function AppHeader() {
  return (
    <header className="appHeader">
      <Link href="/" className="brandLink" aria-label="SHASHINYA ホーム">
        SHASHINYA
      </Link>
      <nav className="headerNav" aria-label="サイト内ナビゲーション">
        <Link href="/#about">想い</Link>
        <Link href="/#menu">撮影メニュー</Link>
        <Link href="/#flow">流れ</Link>
        <Link href="/#contact">相談する</Link>
      </nav>
    </header>
  );
}
