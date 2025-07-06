import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};

export default nextConfig;
