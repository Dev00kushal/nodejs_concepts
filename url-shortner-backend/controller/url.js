const shortId = require("shortid");
const URL = require("../model/url");

// Function to create a short URL
async function createShortUrl(req, res) {
  // Check if URL is present in the request body
  if (!req.body.url) return res.status(400).json({ error: "URL is required" });

  const ShortId = shortId();
  await URL.create({
    shortId: ShortId,
    redirectUrl: req.body.url,
    vistHistory: [],
  });
  return res.json({ id: ShortId });
}

// Function to get analytics for a short URL
async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.vistHistory.length,
    analytics: result.vistHistory,
  });
}

// Export the functions as module exports
module.exports = {
  createShortUrl,
  getAnalytics,
};
