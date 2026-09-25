/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // This site has no server-side work: every section is statically renderable.
  // Uncomment to emit a plain static bundle in ./out that any host can serve.
  // Do this only once the request form posts to an external endpoint rather
  // than a Next route handler.
  // output: 'export',
};

export default nextConfig;
