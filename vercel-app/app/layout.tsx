import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wellcome",
  description: "간단한 인사 웹앱",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
