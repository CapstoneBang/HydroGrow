import express from "express";
import profileController from "../controllers/profileController.js";
import { loginUser } from "../controllers/authController.js";
import tanamanController from "../controllers/tanamanController.js";
import { authenticateToken } from "../middleware/index.js";
import getMedaliCount from "../controllers/medaliController.js";

const router = express.Router();

router.get("/profile", authenticateToken, profileController.getUsers);
router.post("/medali", getMedaliCount);
router.post("/tanaman", authenticateToken, async (req, res) => {
  try {
    const userEmail = req.body.email;

    if (!userEmail) {
      return res
        .status(400)
        .json({ error: "Email is required in the request body" });
    }

    // Retrieve koleksi_tanaman data for the user by email
    const koleksiTanamanData = await tanamanController.getTanamanData(
      userEmail
    );

    res.status(200).json({ koleksiTanamanData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/profile", profileController.registerUser);
router.post("/login", loginUser);
router.post("/buat-tanaman", tanamanController.createTanaman);

export default router;
