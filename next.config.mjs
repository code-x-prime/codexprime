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
            }
        ]
    }
};

export default nextConfig;
