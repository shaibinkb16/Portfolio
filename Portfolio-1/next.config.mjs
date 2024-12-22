/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This is necessary for static exports in Next.js 13+
  images: {
    unoptimized: true, // Disable image optimization for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.svgrepo.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
