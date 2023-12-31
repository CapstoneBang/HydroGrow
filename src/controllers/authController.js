// loginController.js
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        error: true,
        status: 401,
        message: "Please enter an email and password",
      });
    }

    const db = getFirestore();
    const usersCollection = collection(db, "users");

    const userQuery = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      return res
        .status(401)
        .json({ error: true, status: 401, message: "Incorrect email" });
    }

    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data();

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: true, status: 401, message: "Incorrect Password" });
    }

    const token = jwt.sign(
      { userId: userDoc.id, email: user.email, name: user.username },
      SECRET_KEY
    );

    res.status(200).json({
      success: true,
      token,
      userId: userDoc.id,
      name: user.username,
    });
  } catch (error) {
    console.error("Error authenticating user: ", error);
    res
      .status(500)
      .json({ error: true, status: 500, message: "Internal Server Error" });
  }
};

export { loginUser };
