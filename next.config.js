/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
    images: {
        domains: ['live.staticflickr.com']
    },
    output: "export",
    env: {
        API_KEY: process.env.API_KEY
    }
}

module.exports = nextConfig
