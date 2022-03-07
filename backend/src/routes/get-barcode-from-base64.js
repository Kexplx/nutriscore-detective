const Quagga = require("quagga").default;

function getBarcodeFromBase64(base64) {
  return new Promise((res, rej) => {
    Quagga.decodeSingle(
      {
        src: base64,
        decoder: {
          readers: ["ean_reader"],
        },
        numOfWorkers: 0,
      },
      (result) => {
        if (result?.codeResult) {
          res(Number(result.codeResult.code));
        } else {
          rej();
        }
      }
    );
  });
}

module.exports = getBarcodeFromBase64;
