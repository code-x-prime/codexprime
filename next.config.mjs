/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "g0p7auwucr.ufs.sh"
            },
            {
                protocol: 'https',
                hostname: "utfs.io"
            },
            {
                protocol: 'https',
                hostname: "pub-a3d2b35862c1483894ffbee942bb995e.r2.dev"
            }
        ]
    }
};

export default nextConfig;
