/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://flagsdev.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ["/404"],
};
