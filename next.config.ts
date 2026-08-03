import type { NextConfig } from "next";
import { TOAST } from "./lib/constants";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/catering-2',
        destination: 'https://mannabread.com/catering',
        permanent: true,
      },
      {
        source: '/menu/:path*',
        destination: 'https://mannabread.com/menu',
        permanent: true,
      },
      {
        source: '/order',
        destination: TOAST.orderOnline,
        permanent: true,
      },
      {
        source: '/order/:path*',
        destination: TOAST.orderOnline,
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
