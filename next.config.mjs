const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
/** @type {import('next').NextConfig} */
export default {
  output: 'export',
  trailingSlash: true,
  basePath: base || undefined,
  assetPrefix: base || undefined,
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
};
