const mongoose = require("mongoose");

/**
 * Represents the schema for a URL in the database.
 *
 * @typedef {Object} UrlSchema
 * @property {string} shortId - The unique identifier for the shortened URL.
 * @property {string} redirectUrl - The original URL to redirect to.
 * @property {Array} visitHistory - An array of objects representing the visit history of the URL.
 * @property {number} visitHistory[].timeStamp - The timestamp of each visit.
 * @property {Date} createdAt - The timestamp of when the URL was created.
 * @property {Date} updatedAt - The timestamp of when the URL was last updated.
 */
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    vistHistory: [
      {
        timeStamp: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);


const URL = mongoose.model("url", urlSchema);

module.exports = URL;