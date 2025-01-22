import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['nps.gov', 'www.nps.gov'], // Allow both 'nps.gov' and 'www.nps.gov' for image sources
  },
};

export default nextConfig;
