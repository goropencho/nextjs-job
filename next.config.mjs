/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utibfvholm3ya8kl.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
