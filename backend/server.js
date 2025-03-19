const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

// ✅ Use CORS to allow multiple origins
app.use(cors({
    origin: ["https://screenshot-3prx.onrender.com", "http://localhost:5500"]
}));

// ✅ Screenshot route
app.get("/screenshot", async (req, res) => {
    try {
        console.log("Launching Puppeteer...");

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-software-rasterizer'
            ]
        });

        const page = await browser.newPage();

        // ✅ Go to the frontend hosted URL
        await page.goto("https://screenshot-3prx.onrender.com/frontend/index.html", { waitUntil: "networkidle2", timeout: 60000 });

        // ✅ Set viewport size
        await page.setViewport({ width: 1920, height: 1080 });

        // ✅ Save screenshot in the /tmp directory (safe for Render)
        const screenshotPath = path.join('/tmp', "screenshot.png");

        // ✅ Capture the screenshot
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await browser.close();

        console.log("Screenshot captured!");

        // ✅ Send the screenshot as a downloadable image
        res.download(screenshotPath, "screenshot.png", (err) => {
            if (err) {
                console.error("Error sending screenshot:", err);
                res.status(500).send("Failed to send screenshot.");
            } else {
                console.log("Screenshot sent.");

                // ✅ Delete the screenshot after download completion
                setTimeout(() => {
                    console.log("Deleting screenshot...");
                    if (fs.existsSync(screenshotPath)) {
                        fs.unlinkSync(screenshotPath);
                    }
                }, 10000);  // 10 seconds to ensure download completion
            }
        });

    } catch (error) {
        console.error("Error capturing screenshot:", error);
        res.status(500).send("Failed to capture screenshot.");
    }
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
