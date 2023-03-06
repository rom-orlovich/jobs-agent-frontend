/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['lh3.googleusercontent.com']
  },
  rewrites: async () => {
    console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs-agent/:proxy*`);
    return [
      {
        source: '/api/jobs-agent/:proxy*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs-agent/:proxy*`
      }
    ];
  }
};

module.exports = nextConfig;
