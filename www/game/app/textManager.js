export function setText(textObj, text) {
  return new Promise((resolve) => {
    const fullText = textObj.text;
    let currentLength = textObj.text.length;
    let currentText = textObj.text;
    let isLineOn = true;
    textObj.text = textObj.text + '|';
    let isClear = !!fullText.length;
    let isReady = false;
    const clearTextInterval = setInterval(() => {
      if(isClear) {
        currentLength -= 1;
        currentText = fullText.substr(0, currentLength);
        if(currentLength === 0) {
          isClear = false;
        }
      } else {
        currentLength += 1;
        currentText = text.substr(0, currentLength);
        if(currentText === text) {
          clearInterval(clearTextInterval);
          isReady = true;
          textObj.text = currentText;
          resolve();
        }
      }
      if(!isReady) {
        if(isLineOn) {
          isLineOn = false;
          currentText += '|'
        } else {
          isLineOn = true;
        }
        textObj.text = currentText;
      }
    }, 80);
  })
}