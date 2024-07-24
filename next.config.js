/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "websitedemos.net",
        protocol: "https",
      },
      {
        hostname: "images.pexels.com",
        protocol: "https",
      },
      {
        hostname: "m.media-amazon.com",
        protocol: "https",
      },
      {
        hostname: "tailwindui.com",
        protocol: "https",
      },
      {
        hostname: "authjs.dev",
        protocol: "https",
      },
      {
        hostname: "utfs.io",
        protocol: "https",
      },
    ],
    loader: "default",
  },
};

module.exports = nextConfig;
