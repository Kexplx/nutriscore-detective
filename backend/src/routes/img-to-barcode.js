const router = require("express").Router();
const getBarcodeFromBase64 = require("./get-barcode-from-base64");

router.post("/", async (req, res) => {
  const { imgAsBase64 } = req.body;

  try {
    const barcode = await getBarcodeFromBase64(imgAsBase64);
    res.send({ barcode });
  } catch (err) {
    res.status(400);
  }

  res.end();
});

module.exports = router;
