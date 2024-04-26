const express  = require("express");
const app = express();
const PORT = 8001;
const {connectToDb} = require("./db/connect");
const urlRoute = require("./routes/url");
const URL = require("./model/url");
const { time } = require("discord.js");
connectToDb("mongodb://localhost:27017/short-url").then(() => {
console.log("Connected to database")
});

app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) =>  {
   const shortId = req.params.shortId;
 const entry =  await URL.findOneAndUpdate(
    {shortId},{$push:{
        vistHistory : {
            timestamp: Date.now(),
        },
    }}
);
res.redirect(entry.redirectUrl)
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

