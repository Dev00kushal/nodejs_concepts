const express = require("express"); // Importing the Express module
const path = require("path"); // Importing the Path module
const { connectToDb } = require("./db/connect"); // Importing the connectToDb function from the "./db/connect" module
const urlRoute = require("./routes/url"); // Importing the urlRoute module
const URL = require("./model/url"); // Importing the URL model

// required modules
const app = express(); // Creating an instance of the Express application
const PORT = 8001; // Setting the port number

// --- Connect to database ---
connectToDb("mongodb://localhost:27017/short-url").then(() => {
    console.log("Connected to database"); // Connecting to the MongoDB database
});

// --- EJS ----
app.set("view engine", "ejs"); // Setting the view engine to EJS
app.set("views", path.resolve("./views")); // Setting the views directory

// --- Middleware ---
app.use(express.json()); // Parsing JSON data
app.use("/url", urlRoute); // Using the urlRoute middleware for the "/url" path

// --- Routes ---
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId; // Extracting the shortId parameter from the request URL
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                vistHistory: {
                    timestamp: Date.now(), // Adding a new visit history entry with the current timestamp
                },
            },
        }
    );
    res.redirect(entry.redirectUrl); // Redirecting to the URL specified in the entry's redirectUrl field
});

// --- Server ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Starting the server and logging the port number
});
