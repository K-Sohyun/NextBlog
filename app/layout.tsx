import Link from "next/link";
import "./globals.scss";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin-ext"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "My Blog",
  description: "A simple blog built with Next.js",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={notoSansKR.className}>
        <header>
          <h1><Link href="/">Blog⚡</Link></h1>
        </header>
        {children}
        <footer>
          <p>© {new Date().getFullYear()} Blog. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
