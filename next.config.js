/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize output - use 'standalone' for smaller deployments in production
  output: 'standalone',

  // More aggressive image optimization
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
    unoptimized: process.env.NODE_ENV === 'development', // Only unoptimize in development
    minimumCacheTTL: 60, // Cache optimized images for 60 seconds
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Define exact device sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Define exact image sizes
  },

  // During development, disable strict image checks
  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: "tsconfig.json",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Add performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Add strong caching headers for static assets
  async headers() {
    return [
      {
        source: "/(fonts|images|media)/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Webpack optimization (if needed)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimize CSS extraction by splitting into smaller chunks
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: "styles",
          test: /\.(css|scss)$/,
          chunks: "all",
          enforce: true,
        },
        // Add a specific chunk for heavy UI components
        uiComponents: {
          name: "ui-components",
          test: /[\\/]Components[\\/]ui[\\/]/,
          chunks: "all",
          priority: 10,
        },
      };
    }
    return config;
  },

  // Add Turbopack configuration
  experimental: {
    // Optimize package imports
    optimizePackageImports: [
      "@tabler/icons-react",
      "lucide-react",
      "framer-motion",
    ],
    // Server Actions are enabled by default in Next.js 14.
    // To customize settings (e.g., bodySizeLimit), define serverActions as an object.
    serverActions: {
      bodySizeLimit: "1mb", // adjust this limit as needed
    },
    webVitalsAttribution: ["CLS", "LCP", "FCP", "FID", "TTFB", "INP"],
    // Add Turbopack configuration without custom loaders
    turbo: {
      // Remove the rules configuration that was causing the error
    },
    // These settings help ensure CSS is properly loaded in production
    optimizeCss: true,
    forceSwcTransforms: true,
  },

  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // swcMinify: true,
};

module.exports = nextConfig;
