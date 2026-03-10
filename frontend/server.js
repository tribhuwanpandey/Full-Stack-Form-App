const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

// Set view engine
app.set("view engine", "ejs");

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files if needed
app.use(express.static("public"));

// Form page
app.get("/", (req, res) => {
    res.render("form");
});

// Handle form submission
app.post("/submit", async (req, res) => {
    try {
        // Auto timestamp
        const currentDate = new Date();
        const data = {
            name: req.body.name,
            email: req.body.email,
            date: currentDate.toLocaleDateString(),
            time: currentDate.toLocaleTimeString()
        };

        // Send to Flask backend
        const response = await axios.post("http://backend:5000/submit", data);

        if (response.data.status === "success") {
            // Render success page
            res.render("success", data);
        } else {
            res.send("Error: " + response.data.message);
        }
    } catch (err) {
        res.send("Error: " + err.message);
    }
});

// Start server
app.listen(3000, () => {
    console.log("Frontend running on port 3000");
});