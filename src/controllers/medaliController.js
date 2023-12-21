// Import the getTanamanData function from tanamanController
import tanamanController from "./tanamanController.js";

const getMedaliCount = async (req, res) => {
  try {
    const userEmail = req.body.email;
    console.log(userEmail, "email");

    if (!userEmail) {
      return res.status(400).json({
        error: "User email is required in the request body",
      });
    }

    const tanamanDataPromise = tanamanController.getTanamanData(userEmail);

    const koleksiTanamanData = await tanamanDataPromise;

    console.log(koleksiTanamanData, "after api");

    const itemCount = koleksiTanamanData.length;

    const uniqueJenisTanaman = [
      ...new Set(koleksiTanamanData.map((item) => item.data.jenisTanaman)),
    ];

    const uniqueJenisTanamanCount = uniqueJenisTanaman.length;

    return res.status(200).json({
      count: itemCount,
      jenisTanaman: uniqueJenisTanamanCount,
    });
  } catch (error) {
    console.error("Error getting count of items: ", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export default getMedaliCount;
