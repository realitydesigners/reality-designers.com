/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    inlineCss: true,
  },
  images: {
    domains: ["cdn.sanity.io", "source.unsplash.com"],
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "source.unsplash.com",
        protocol: "https",
        pathname: "**",
        port: "",
        search: "",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: process.env.VERCEL_ENV === "production",
  },
  eslint: {
    ignoreDuringBuilds: process.env.VERCEL_ENV === "production",
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
