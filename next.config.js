/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["websitedemos.net", "images.pexels.com", "m.media-amazon.com"],
    loader: "default",
  },
  fontLoaders: [
    { loader: "@next/font/google", options: { subsets: ["latin"] } },
  ],
};

module.exports = nextConfig;
