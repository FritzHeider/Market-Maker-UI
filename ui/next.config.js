// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Use SWC for faster builds and minification.
  
  // Configure image domains if you plan to load images from external sources.
  images: {
    domains: ['example.com'], // Replace 'example.com' with your allowed domains.
  },
  // Enable experimental features if you're using the app directory or other new Next.js functionality.
 
};

module.exports = nextConfig;
