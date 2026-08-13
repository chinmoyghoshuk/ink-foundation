import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Docker image
  output: 'standalone',
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    // Phone-first: the smallest widths matter most here
    deviceSizes: [360, 420, 640, 828, 1080, 1400, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
}

export default nextConfig
