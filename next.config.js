/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require('path');
const withLess = require('next-with-less');

const setting = require('./src/settings.json');

module.exports = withLess({
  reactStrictMode: false,
  transpilePackages: ['@arco-design/web-react', '@arco-themes/react-arco-pro'],
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        'arcoblue-6': setting.themeColor,
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias['@/assets'] = path.resolve(
      __dirname,
      './src/public/assets',
    );
    config.resolve.alias['@'] = path.resolve(__dirname, './src');

    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/workplace',
        permanent: true,
      },
    ];
  },
  pageExtensions: ['tsx'],
});
