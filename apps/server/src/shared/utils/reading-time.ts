const WORDS_PER_MINUTE = 200;

/**
 * Estimate reading time in whole minutes from an article body.
 * Words are separated by any run of whitespace. An empty or whitespace-only body gives 0;
 * any body with at least one word gives at least 1.
 */
export const calculateReadingTime = (body: string): number => {
  const trimmed = body.trim();

  if (trimmed === '') {
    return 0;
  }

  const wordCount = trimmed.split(/\s+/).length;

  return Math.ceil(wordCount / WORDS_PER_MINUTE);
};
