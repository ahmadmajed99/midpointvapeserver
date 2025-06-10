import express from "express";
import contactUsRoute from "./routes/contactUsRoute.js";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
// const __dirname = path.dirname(__filename);
dotenv.config();

const PORT = process.env.PORT;

const app = new express();

const corsOptions = {
  origin: "https://sparkmidpoint.com",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.resolve(__dirname, "../build")));
// parse application/json
app.use(bodyParser.json());

app.use("/api", contactUsRoute);

app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.get("/home", (req, res) => {
  res.send("Hello World test!");
});

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../build", "index.html"));
// });

app.listen(PORT, console.log(`Server Running on Port ${PORT}`));
