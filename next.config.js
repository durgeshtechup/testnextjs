/** @type {import('next').NextConfig} */

// const withTM = require('next-transpile-modules')(['@babel/preset-react']);
//   '@fullcalendar/common',
//   '@fullcalendar/common',
//   '@fullcalendar/daygrid',
//   '@fullcalendar/interaction',
//   '@fullcalendar/react',

const nextConfig = {
  swcMinify: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  reactStrictMode: true,
  // distDir:"next/build",
  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'scontent.fotp8-1.fna.fbcdn.net',
    ],
    // Make ENV
    unoptimized: true,
  },
  // experimental: {
  //   appDir: true,
  // },
  env: {
    REACT_APP_API_BASE_URL: 'https://backend-dev.bm2bank.com',
    // REACT_APP_API_BASE_URL: 'https://backend.bm2bank.com',
    // REACT_APP_API_BASE_URL: 'https://backend-dev.lightningchecks.com',
    // REACT_APP_API_BASE_URL: 'https://backend.lightningchecks.com',
    // NETLIFY_NEXT_PLUGIN_SKIP:true
  },
};

module.exports = nextConfig;
