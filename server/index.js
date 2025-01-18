import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use("/", (req, res) => {
  res.send("Hi");
});

app.listen(PORT, () => {
  console.log(`Server launched at port ${PORT}`);
});
