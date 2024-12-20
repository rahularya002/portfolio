// generate-sitemap.js

const fs = require('fs');
const path = require('path');

// Your site metadata
const metadata = {
  title: 'ENB Quantum',
  description: 'The official ENB Quantum website.',
  metadataBase: 'https://next-learn-dashboard.vercel.sh',
};

// List your pages/paths here
const pages = [
  '', // Home page
  'about',
  'contacts',
  'services',
  'workshop',
  'future',
  'registration',
  'support/Privacy',
  'support/Refund',
  'support/Terms',
  'workshop/Signup',
];

const generateSitemap = () => {
  const baseUrl = metadata.metadataBase;
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  pages.forEach((page) => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${baseUrl}/${page}</loc>\n`;
    sitemap += `    <changefreq>daily</changefreq>\n`; // You can adjust the frequency
    sitemap += `    <priority>0.7</priority>\n`; // You can adjust the priority
    sitemap += `  </url>\n`;
  });

  sitemap += `</urlset>`;

  // Write the sitemap to the public directory
  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
};

generateSitemap();
