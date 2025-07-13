import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Wrapper from "@/components/Wrapper";
import Header from "@/components/header/Header";
import { SessionProvider } from "next-auth/react";

const Open = Open_Sans({
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
<<<<<<< Updated upstream
        className={`${Open.className} antialiased`}
=======
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
>>>>>>> Stashed changes
      >
        <SessionProvider>
          <Header />
          <Wrapper>
            {children}
          </Wrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
