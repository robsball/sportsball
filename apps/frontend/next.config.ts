/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Proxy API requests
        destination: "http://localhost:4000/:path*", // Redirect to backend
      },
    ];
  },
};

module.exports = nextConfig;