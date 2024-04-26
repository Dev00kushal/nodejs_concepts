const express = require("express")
/**
 * Module for handling URL routes.
 * @module routes/url
 */
const { createShortUrl,getAnalytics } = require("../controller/url")
const router = express.Router()

router.post("/",createShortUrl)

router.get("/analytics/:shortId",getAnalytics);
module.exports = router