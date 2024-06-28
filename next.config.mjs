/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
    },
    images: {
        domains: ['localhost', 'api.tfe.thrills.world']
    },
};
export default nextConfig;
