import express from "express";
import dotenv from "dotenv";
import { verifyKey } from "./verify.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/key/verify", async (req, res) => {
  const { key, hwid } = req.body;
  if (!key || !hwid)
    return res.status(400).json({ success: false, reason: "BAD_REQUEST" });

  const result = await verifyKey(key, hwid);
  res.json(result);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("ASTRA KEY API running");
});
