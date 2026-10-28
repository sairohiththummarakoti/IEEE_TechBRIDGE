/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Keep the server build: Cloudflare Workers runs hourly event revalidation.
};

export default nextConfig;
