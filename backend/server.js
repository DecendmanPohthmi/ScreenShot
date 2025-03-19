const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

// ✅ Use CORS to allow requests from port 5500
app.use(cors({
    origin: "https://screenshot-3prx.onrender.com"
}));

// ✅ Screenshot route
app.get("/screenshot", async (req, res) => {
    try {
        console.log("Launching Puppeteer...");

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // ✅ Go to the frontend index.html running on port 5500
        await page.goto("https://screenshot-3prx.onrender.com/frontend/index.html", { waitUntil: "networkidle2", timeout: 60000 });

        // ✅ Set viewport to match your frontend size
        await page.setViewport({ width: 1920, height: 1080 });

        const screenshotPath = path.join(__dirname, "screenshot.png");

        // ✅ Capture only the visible page content
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await browser.close();

        console.log("Screenshot captured!");

        // ✅ Send the screenshot as a downloadable image
        res.download(screenshotPath, "pinterest-marketing.png", (err) => {
            if (err) {
                console.error("Error sending screenshot:", err);
                res.status(500).send("Failed to send screenshot.");
            } else {
                console.log("Screenshot sent.");

                // ✅ Delete the screenshot after 5 seconds
                setTimeout(() => {
                    console.log("Deleting screenshot...");
                    fs.unlinkSync(screenshotPath);
                }, 5000);
            }
        });

    } catch (error) {
        console.error("Error capturing screenshot:", error);
        res.status(500).send("Failed to capture screenshot.");
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
