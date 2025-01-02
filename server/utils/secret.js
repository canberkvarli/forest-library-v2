import crypto from "crypto";
import fs from "fs";
import path from "path";

// Generate a 256-bit random JWT secret
const secret = crypto.randomBytes(32).toString("hex");

// Get the current directory of the module
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Path to the .env file
const envFilePath = path.resolve(__dirname, "../../server/.env");

// Read the current .env file (if it exists)
fs.readFile(envFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading .env file: ", err);
    return;
  }

  // Check if JWT_SECRET is already in the .env file
  if (data.includes("JWT_SECRET")) {
    console.log("JWT_SECRET already exists in .env file");
  } else {
    // Append the generated secret to the .env file
    const updatedEnvData = `${data}\nJWT_SECRET=${secret}\n`;

    fs.writeFile(envFilePath, updatedEnvData, "utf8", (writeErr) => {
      if (writeErr) {
        console.error("Error writing to .env file: ", writeErr);
      } else {
        console.log(`JWT_SECRET has been added to .env: ${secret}`);
      }
    });
  }
});
