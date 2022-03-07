const express = require('express');
const cors = require('cors');

const app = express();

// Install middleware.
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Install routes.
const imgToBarcodeRouter = require('./routes/img-to-barcode');
app.use('/img-to-barcode', imgToBarcodeRouter);

// Start the server.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
