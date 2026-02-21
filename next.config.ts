import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["next-mdx-remote"],
  images: {
    localPatterns: [
      {
        // omitting "search" in localPatterns objects will allow all paths
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          ...(process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
            ? [
                {
                  key: "X-Robots-Tag",
                  value: "index, follow",
                },
              ]
            : [
                {
                  key: "X-Robots-Tag",
                  value: "noindex, nofollow",
                },
              ]),
        ],
      },
    ];
  },
  typedRoutes: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
