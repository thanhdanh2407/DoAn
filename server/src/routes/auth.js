import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  res.status(200).json("ok");
});

export default router;
