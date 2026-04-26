/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 't3.ftcdn.net',
            },
            {
                protocol: 'https',
                hostname: 't4.ftcdn.net',
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
            }
        ],
      }, 
};

export default nextConfig;
