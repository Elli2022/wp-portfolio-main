/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: "https",
                hostname:"ellis.0.capacedev.se/graphql",
            }
        ]
    }
}

module.exports = nextConfig
