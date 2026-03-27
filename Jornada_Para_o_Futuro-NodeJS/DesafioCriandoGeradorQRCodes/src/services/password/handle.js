import permittedCharacters from "./utils/permitted-characters.js";
import { generatePronounceablePassword, calculatePasswordStrength } from "./utils/password-utils.js";

async function handle(options = {}) {
  let characters = [];
  let password = "";

  const passwordLength = parseInt(process.env.PASSWORD_LENGTH) || 12;
  const excludeSimilar = options.excludeSimilar === true;
  const passwordType = options.passwordType || 1;

  if (passwordType == 2) {
    // Pronounceable password
    password = generatePronounceablePassword(passwordLength);
  } else {
    // Random password
    characters = await permittedCharacters();

    if (excludeSimilar) {
      // Filter similar characters
      const similarChars = ["0", "O", "o", "1", "l", "I", "i"];
      characters = characters.filter((c) => !similarChars.includes(c));
    }

    for (let i = 0; i < passwordLength; i++) {
      const index = Math.floor(Math.random() * characters.length);
      password += characters[index];
    }
  }

  return {
    password,
    strength: calculatePasswordStrength(password),
  };
}

export default handle;
