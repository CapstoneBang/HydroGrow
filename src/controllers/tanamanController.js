import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";

const getTanamanData = async (userEmail) => {
  try {
    const db = getFirestore();
    const koleksiTanamanColRef = collection(db, "koleksi_tanaman");

    const q = query(koleksiTanamanColRef, where("email", "==", userEmail));

    const querySnapshot = await getDocs(q);
    const koleksiTanamanData = [];

    querySnapshot.forEach((doc) => {
      koleksiTanamanData.push({ id: doc.id, data: doc.data() });
    });

    return koleksiTanamanData;
  } catch (error) {
    console.error("Error getting koleksi_tanaman documents: ", error);
    throw error;
  }
};

const createTanaman = async (req, res) => {
  try {
    const { email, jenisTanaman, pipa, lubang, tanggalTanam, panen } = req.body;

    const db = getFirestore();
    const koleksiTanamanColRef = collection(db, "koleksi_tanaman");

    // Add a new document to the koleksi_tanaman collection
    const docRef = await addDoc(koleksiTanamanColRef, {
      email,
      jenisTanaman,
      pipa,
      lubang,
      tanggalTanam,
      panen,
    });

    // Return the new tanaman document
    return res.status(201).json({
      id: docRef.id,
      data: {
        email,
        jenisTanaman,
        pipa,
        lubang,
        tanggalTanam,
        panen,
      },
    });
  } catch (error) {
    console.error("Error creating tanaman document: ", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export default { getTanamanData, createTanaman };
