/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["example.com", "localhost", "bs-ev1y.onrender.com"],
  },
};

module.exports = nextConfig;
