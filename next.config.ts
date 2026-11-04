import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  transpilePackages: ["sweetalert2"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }, // <-- Thêm dấu phẩy ở đây
}; // <-- Thêm dấu ngoặc nhọn đóng Object ở đây

export default nextConfig;