/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '*.basestock.ru',
      },
      {
        protocol: 'https',
        hostname: 'xn--80abvjddo3a.xn--p1ai',
      },
    ],
  },
};

export default nextConfig;
