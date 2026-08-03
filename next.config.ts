import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/catering-2',
        destination: 'https://mannabread.com/catering',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mannabread.com' }],
        destination: 'https://mannabread.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
