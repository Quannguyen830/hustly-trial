/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['storage.googleapis.com', 'avatars.githubusercontent.com'],
  },
};

export default nextConfig;
