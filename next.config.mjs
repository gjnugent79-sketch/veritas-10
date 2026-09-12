/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/veritas-10',
  assetPrefix: '/veritas-10',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
