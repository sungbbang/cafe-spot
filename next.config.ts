import type { NextConfig } from 'next';

const SUPABASE_HOSTNAME = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!)
  .hostname;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: SUPABASE_HOSTNAME,
      },
    ],
  },
};

export default nextConfig;
