/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ciseco-nextjs.vercel.app",
      },
      {
        hostname: "product.hstatic.net",
      },
      {
        hostname: "img.freepik.com",
      },
      {
        hostname: "demos.themeselection.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = {
  ...nextConfig,
  env: {
    NEXT_PUBLIC_API_ENDPOINT: "http://127.0.0.1:9000/api/v1",
    NEXT_PUBLIC_ENDPOINT: "http://localhost:3000",
  },
};
