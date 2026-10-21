/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // High-performance package imports optimization for Lucide, Framer-motion, D3
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "d3"],
  },
  // Optimizations for Vercel Edge Network & Production Asset Delivery
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:file(favicon.*|apple-touch-icon.*|ans-logo.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
