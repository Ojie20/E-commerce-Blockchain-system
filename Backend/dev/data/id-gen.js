export function genId() {
  let characters = "";
  characters += "1234567890";
  characters += "abcdefghijklmnopqrstuvwxyz";
  let idArray = [];

  while (idArray.length < 9) {
    const character = characters[Math.floor(Math.random() * characters.length)];
    idArray.push(character);
  }
  return idArray.join("");
}

module.exports = genId;
