import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Wrapper from "@/components/Wrapper";
import Header from "@/components/header/Header";

const openSans = Open_Sans({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Food Campus",
  description: "Food Campus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="foodcampus">
      <body
        className={`${openSans.className} antialiased flex flex-col h-screen`}
      >
        <Header />
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  );
}
