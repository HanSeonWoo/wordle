export function encodeWord(word: string): string {
  word = word.toUpperCase();
  if (!/^[A-Z]{5}$/.test(word)) {
    throw new Error(
      "Input must be a 5-letter word containing only A-Z characters."
    );
  }
  const salt = Math.random().toString(36).substring(2, 5);
  let result = salt;
  for (let i = 0; i < word.length; i++) {
    const charCode = word.charCodeAt(i) ^ salt.charCodeAt(i % salt.length);
    result += String.fromCharCode(charCode);
  }
  return btoa(result).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export function decodeWord(encoded: string): string {
  try {
    const decoded = atob(encoded.replace(/-/g, "+").replace(/_/g, "/"));
    if (decoded.length !== 8) {
      throw new Error(`Invalid decoded length: ${decoded.length}`);
    }
    const salt = decoded.slice(0, 3);
    let result = "";
    for (let i = 3; i < decoded.length; i++) {
      const charCode =
        decoded.charCodeAt(i) ^ salt.charCodeAt((i - 3) % salt.length);
      result += String.fromCharCode(charCode);
    }
    if (!/^[A-Z]{5}$/.test(result)) {
      throw new Error(`Invalid decoded word: ${result}`);
    }
    return result;
  } catch (error: unknown) {
    console.error("Decoding error:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to decode the word: ${error.message}`);
    } else {
      throw new Error("Failed to decode the word: Unknown error");
    }
  }
}
