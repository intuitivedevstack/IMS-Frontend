/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["example.com", "localhost", "fs-six.vercel.app"],
  },
};

module.exports = nextConfig;
