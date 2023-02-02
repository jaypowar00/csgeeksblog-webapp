/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: '*'
      }
    ]
  },
  rewrites: async () => {
    return {
      beforeFiles: [{source: '/posts/:id([^0-9]+)', destination: '/404'}],
    }
  },
}

module.exports = nextConfig
