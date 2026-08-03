import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ============================================================
   * IMAGE DOMAINS
   * ============================================================
   * We use Unsplash images for development. Add any other image
   * domains you need here. When you replace images with local
   * files, you can remove these entries.
   * ============================================================ */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
