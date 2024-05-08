/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["websitedemos.net", "images.pexels.com", "m.media-amazon.com", "tailwindui.com", "authjs.dev"],
    loader: "default",
  }
};

module.exports = nextConfig;
