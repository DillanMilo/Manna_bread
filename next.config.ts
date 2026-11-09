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
      // Order Online hidden until Manna is ready; uncomment to restore
      // {
      //   source: '/order',
      //   destination: TOAST.orderOnline,
      //   permanent: true,
      // },
      // {
      //   source: '/order/:path*',
      //   destination: TOAST.orderOnline,
      //   permanent: true,
      // },
      // Online ordering is paused: send the old /order link to the menu (temporary)
      {
        source: '/order',
        destination: '/menu',
        permanent: false,
      },
      {
        source: '/order/:path*',
        destination: '/menu',
        permanent: false,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mannabread.com' }],
        destination: 'https://mannabread.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
