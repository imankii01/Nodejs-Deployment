// app.js

const dotenv = require("dotenv");
const express = require("express");
const app = express();

// Determine the environment and set the corresponding .env file
const ENV = process.env.NODE_ENV || "development";
const envFilePath =
  ENV === "production" ? ".env.prod" : ENV === "uat" ? ".env.uat" : ".env";

dotenv.config({ path: envFilePath });

const port = process.env.PORT || 8000;
console.log(`Using port: ${port}`);
let server;

app.get("/status", (req, res) => {
  res.send("Server is live");
});

app.get("/archive.nptel.ac.in/noc/Ecertificate/", (req, res) => {
  const certificateId = req.query.q;
  console.log(`Certificate ID: ${certificateId}`);
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <script type="text/javascript">
          window.hasMobileFirstExtension = true;
        </script>
      </head>
      <body data-new-gr-c-s-check-loaded="14.1068.0" data-gr-ext-installed="">
        <center
          style="
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
          "
        >
          <a
            href="https://s3.eu-north-1.amazonaws.com/archive.nptel.ac.in/content/noc/NOC24/SEM1/Ecertificates/106/noc24-cs18/Course/${certificateId}.pdf"
            target="_blank"
            style="
              color: white;
              background-color: #3070bf;
              padding: 10px 20px;
              border-radius: 8px;
              text-decoration: none;
              display: inline-block;
              width: 156px;
            "
          >Course Certificate</a><br />
        </center>
      </body>
    </html>
  `;
  res.send(htmlContent);
});

// Route to close the server
app.get("/shutdown", (req, res) => {
  res.send("Server is shutting down...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

// Catch-all route for not found pages
app.use((req, res) => {
  res.status(404).send("<h1>404 - Not Found</h1>");
});

server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port} in ${ENV} mode`);
});
