/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/search',
        destination: '/',
        permanent: true
      }
    ];
  },
  images: {
    domains: ['lh3.googleusercontent.com']
  }
};

module.exports = nextConfig;
