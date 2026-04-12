import type { NextConfig } from "next";

const isDevelopmentMode = process.env.NODE_ENV === "development";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline'${isDevelopmentMode ? " 'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self';
    ${isDevelopmentMode ? "" : "upgrade-insecure-requests;"}
`;

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  transpilePackages: ["next-mdx-remote"],
  images: {
    localPatterns: [
      {
        // omitting "search" in localPatterns objects will allow all paths
        pathname: "/**",
      },
    ],
  },
  // biome-ignore lint/suspicious/useAwait: Next.js config functions are often async
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
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
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
  // biome-ignore lint/suspicious/useAwait: Next.js config functions are often async
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/blog/handling-above-the-fold-images-the-right-way",
        destination: "/blog/handling-above-the-fold-lcp-images-the-right-way",
        permanent: true,
      },
    ];
  },
  // biome-ignore lint/suspicious/useAwait: Next.js config functions are often async
  async rewrites() {
    return [
      {
        source: "/blog/:slug",
        has: [
          {
            type: "header",
            key: "accept",
            value: "(.*)text/markdown(.*)",
          },
        ],
        destination: "/blog/md/:slug",
      },
      // Explicit .md extension also serves markdown
      {
        source: "/blog/:slug.md",
        destination: "/blog/md/:slug",
      },
    ];
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    turbopackFileSystemCacheForDev: false,
    sri: {
      algorithm: "sha256", // or 'sha384' or 'sha512'
    },
  },
};

export default nextConfig;
