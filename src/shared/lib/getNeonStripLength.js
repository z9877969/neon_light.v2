import CHAR_LINES_MAP from "./charLinesMap.json";

const PX_IN_CM = 0.026458;

function getCharSize(char, fontSizeCM, fontFamily = "Arial") {
  const virtualElement = document.createElement("span");
  virtualElement.style.fontFamily = fontFamily;
  virtualElement.style.fontSize = `${fontSizeCM}cm`;
  virtualElement.textContent = char;
  document.body.appendChild(virtualElement);
  const width = virtualElement.offsetWidth;
  document.body.removeChild(virtualElement);
  return { width: width * PX_IN_CM, height: fontSizeCM };
}

function getNeonStripLength(word, fontSizeCM, fontFamily) {
  const stripLength = word.split("").reduce((sum, char) => {
    const { width, height } = getCharSize(char, fontSizeCM, fontFamily);

    for (let [params, charList] of Object.entries(CHAR_LINES_MAP)) {
      let vertical = 0;
      let horizontal = 0;
      let diagonal = 0;

      if (charList.includes(char)) {
        [vertical, horizontal, diagonal] = params.split(" ");

        const len =
          vertical * height +
          horizontal * width +
          diagonal * Math.sqrt(height ** 2 + width ** 2);

        return sum + len;
      }
    }
    return sum + width + height;
  }, 0);

  return stripLength.toFixed(2);
}

export default getNeonStripLength;
