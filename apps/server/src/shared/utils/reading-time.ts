/**
 * Estimate reading time in minutes at 200 words per minute.
 * Returns 0 when the body holds no words, otherwise at least 1.
 */
export const estimateReadingTime = (body: string): number => {
  const words = body.split(/\s+/).filter((word) => word.length > 0);

  if (words.length === 0) {
    return 0;
  }

  return Math.ceil(words.length / 200);
};
