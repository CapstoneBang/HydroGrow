import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
  try {
    const db = getFirestore();
    const colRef = collection(db, "users");

    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });

    res
      .status(200)
      .json({ success: true, message: "Data retrieved successfully" });
  } catch (error) {
    console.error("Error getting documents: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, username } = req.body;

    if (password.length < 6) {
      return res.status(400).json({
        error: true,
        message: "Password should be at least 6 characters long",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const db = getFirestore();
    const usersCollection = collection(db, "users");

    const emailQuery = query(usersCollection, where("email", "==", email));
    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      return res.status(400).json({
        error: true,
        message: "Email already exists",
      });
    }

    const newUserDocRef = await addDoc(usersCollection, {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      username,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: newUserDocRef.id,
    });
  } catch (error) {
    console.error("Error registering user: ", error);

    res.status(500).json({
      error: true,
      message: "Unexpected Error",
    });
  }
};

export default { getUsers, registerUser };
