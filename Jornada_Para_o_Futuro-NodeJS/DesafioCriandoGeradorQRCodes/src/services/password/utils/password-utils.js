// Pronounceable password generator
export function generatePronounceablePassword(length) {
  const vowels = "aeiou";
  const consonants = "bcdfghjklmnpqrstvwxyz";
  let password = "";
  let useConsonant = true;

  for (let i = 0; i < length; i++) {
    if (useConsonant) {
      password += consonants[Math.floor(Math.random() * consonants.length)];
    } else {
      password += vowels[Math.floor(Math.random() * vowels.length)];
    }
    useConsonant = !useConsonant;
  }

  return password;
}

// Calculate password strength
export function calculatePasswordStrength(password) {
  let score = 0;

  if (!password) return { score: 0, label: "N/A", color: "red" };

  // Length scoring
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character variety scoring
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  // Determine label and color
  let label, color;
  if (score <= 2) {
    label = "Fraca";
    color = "red";
  } else if (score <= 4) {
    label = "Media";
    color = "yellow";
  } else if (score <= 5) {
    label = "Forte";
    color = "green";
  } else {
    label = "Muito Forte";
    color = "cyan";
  }

  return { score, label, color };
}

// Filter out similar characters
export function filterSimilarCharacters(characters) {
  const similarMap = {
    "0": ["O", "o"],
    "O": ["0", "o"],
    "1": ["l", "I", "i"],
    "l": ["1", "I", "i"],
    "I": ["1", "l", "i"],
    "i": ["1", "l", "I"],
  };

  return characters.filter((char) => {
    const similar = similarMap[char];
    if (!similar) return true;
    // Keep the character if none of its similar characters are in the list
    return !similar.some((s) => characters.includes(s));
  });
}