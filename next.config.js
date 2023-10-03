/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = {
  ...withPWA({
    dest: 'public',
    register: true,
    skipWating: true,
  }),
};
