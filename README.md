# 📸 ScreenShot Automation Project

## 🚀 Description
This project captures a screenshot of a webpage using **Puppeteer** and **Express.js**.  
The backend server handles the screenshot request and sends the image as a downloadable file.  
The frontend displays the webpage with a **"Take Screenshot"** button.

---

## ⚙️ Features
✅ Automated webpage screenshot capture  
✅ Uses Puppeteer for rendering and capturing  
✅ Express.js for backend server  
✅ Full-page screenshot with proper dimensions  
✅ Auto-downloads the captured image  

---

## 🛠️ Installation

### 1️⃣ **Clone this repository**
git clone https://github.com/DecendmanPohthmi/ScreenShot.git

2️⃣ Backend Setup
Navigate to the backend folder:

cd ScreenShot/backend
Install the dependencies:

npm install
Start the backend server:

node server.js
✅ The server will run at:

http://localhost:3000


3️⃣ Frontend Setup
Open index.html in the frontend folder using Live Server or through:

http://127.0.0.1:5500

🖥️ Usage
Click the "Take Screenshot" button on the frontend.
The backend will capture the screenshot using Puppeteer.
The image will automatically download to your device.


🛠️ Tech Stack
    Backend: Node.js, Express.js, Puppeteer
    Frontend: HTML, CSS, JavaScript


📄 File Structure

/ScreenShot
 ┣ 📁 frontend
 ┃ ┣ 📄 index.html        → Main webpage
 ┃ ┣ 📄 style.css         → Styling file
 ┃ ┣ 📄 script.js         → Handles button click and screenshot request
 ┣ 📁 backend
 ┃ ┣ 📄 server.js         → Express server with Puppeteer integration
 ┣ 📄 README.md           → Project documentation
 ┣ 📄 package.json        → Dependencies and scripts
