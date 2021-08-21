module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['www.notion.so']
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preacr/test-utils',
        'react-dom': 'preact/compat'
      });
    }
    return config;
  }
};
