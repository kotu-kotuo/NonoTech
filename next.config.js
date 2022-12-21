/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
  reactStrictMode: true,
  images: {
    domains: [
      "www.notion.so",
      "images.unsplash.com",
      "s3.us-west-2.amazonaws.com",
      "pixabay.com",
    ],
  },
});
