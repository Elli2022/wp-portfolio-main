/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "ellis.0.capacedev.se",
        },
      ],
    },
    async rewrites() {
      return [
        {
          source: '/home',
          destination: '/', // Assuming that the 'page.tsx' content should be at the root
        },
        // ...other rewrites if necessary
      ];
    },
    // ...other Next.js config options
  }
  
  module.exports = nextConfig;
  