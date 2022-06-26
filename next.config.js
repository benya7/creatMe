/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io"]
  },
  async rewrites() {
    return [
      {
        source: '/uploads',
        destination: '/uploads',
      },
    ]
  },

}
