/** @type {import('next').NextConfig} */
const basePath = process.env.BASE_PATH || ''
const nextConfig = {
  basePath,
  assetPrefix: basePath || undefined,
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
