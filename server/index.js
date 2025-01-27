import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import routers from "./routes/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Saikat");
});

app.use("/api", routers);

app.listen(PORT, () => {
  console.log(`Server launched at port ${PORT}`);
});
