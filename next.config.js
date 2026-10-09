/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/bazar-dor",
  assetPrefix: "/bazar-dor/",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
