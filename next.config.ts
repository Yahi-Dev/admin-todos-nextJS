import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Deshabilita ESLint durante el build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Opcional: Deshabilita la verificación de TypeScript durante el build
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailus.io',
      },
      {
        protocol: 'https',
        hostname: 'media.cnn.com',
      },
    ]
  }
};

export default nextConfig;