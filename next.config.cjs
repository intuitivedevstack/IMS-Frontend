/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "example.com",
      "localhost",
      "imb-phi.vercel.app",
      "imb.onrender.com",
    ],
  },
};

module.exports = nextConfig;
