/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // если используешь Tailwind / SWC — оставляем
  swcMinify: true,

  // Доступные домены для <Image />
  images: {
    domains: ["localhost", "127.0.0.1"],
  },

  // Если нужен strict режим маршрутов
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;