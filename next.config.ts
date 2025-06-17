import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  images: {
    unoptimized: isDev,
    localPatterns: [
      {
        pathname: '/api/serve-image',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.tina.io',
        port: '',
      },
    ],
  },
  env: {
    DEVELOPMENT: isDev.toString(),
  },
  async headers() {
    // these are also defined in the root layout since github pages doesn't support headers
    const headers = [
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'Content-Security-Policy',
        value: "frame-ancestors 'self'",
      },
    ];
    return [
      {
        source: '/(.*)',
        headers,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },
};

export default nextConfig;
