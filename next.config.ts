import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    maximumDiskCacheSize: 0,
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
}

export default nextConfig
