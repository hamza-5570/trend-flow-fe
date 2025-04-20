/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/",
      destination: "/auth/log-in",
      permanent: true,
    },
  ],
};

export default nextConfig;
