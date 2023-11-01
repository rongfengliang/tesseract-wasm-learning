import { OCRClient } from 'tesseract-wasm';

import imgUrl from './6.png'


import traineddataModel from './chi_sim.traineddata'

async function runOCR() {

  // Fetch document image and decode it into an ImageBitmap.
  const imageResponse = await fetch(imgUrl);
  const imageBlob = await imageResponse.blob();
  const image = await createImageBitmap(imageBlob);

  // Initialize the OCR engine. This will start a Web Worker to do the
  // work in the background.
  const ocr = new OCRClient();

  try {
    // Load the appropriate OCR training data for the image(s) we want to
    // process.
    await ocr.loadModel(traineddataModel);

    await ocr.loadImage(image);

    // Perform text recognition and return text in reading order.
    const text = await ocr.getText();

    document.body.textContent = `tesseract-wasm result: ${text}`;

  } finally {
    // Once all OCR-ing has been done, shut down the Web Worker and free up
    // resources.
    ocr.destroy();
  }
}

runOCR();