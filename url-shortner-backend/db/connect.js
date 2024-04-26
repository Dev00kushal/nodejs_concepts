const mongoose = require("mongoose");
/**
 * Connects to the database using the provided URL.
 * @param {string} url - The URL of the database.
 * @returns {Promise} - A promise that resolves when the connection is established.
 */
async function connectToDb(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectToDb
}