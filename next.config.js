/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com', 'www.stadiumguide.com'],
  },
};

module.exports = nextConfig;
