import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Sans_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import styles from "./layout.module.css";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoMono = Noto_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-noto-mono",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "yhk.org",
  description: "개발 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSans.variable} ${notoMono.variable}`}>
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <div className={styles.headerInner}>
              <Link href="/" className={styles.siteTitle}>
                yhk.org
              </Link>
            </div>
          </header>
          <main className={styles.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}
