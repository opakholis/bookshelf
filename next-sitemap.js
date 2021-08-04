module.exports = {
  siteUrl: 'https://books.opakholis.dev',
  generateRobotsTxt: true,
  sitemapSize: 1000,
  exclude: [''],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
