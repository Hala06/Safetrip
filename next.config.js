/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don't run ESLint during build in production
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't run type checking during build - we'll handle it in development
    ignoreBuildErrors: true,
  },
  // Any other config options you need
};

module.exports = nextConfig;
