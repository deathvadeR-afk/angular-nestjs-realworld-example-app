/**
 * Estimate reading time in whole minutes at 200 words per minute.
 * Words are runs of non-whitespace text; returns 0 when the body has no words.
 */
export const estimateReadingTime = (body: string): number => {
  const words = body.split(/\s+/).filter((word) => word.length > 0).length;

  if (words === 0) {
    return 0;
  }

  return Math.max(1, Math.ceil(words / 200));
};
