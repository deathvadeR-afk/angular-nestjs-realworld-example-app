import { estimateReadingTime } from './reading-time';
import { estimateReadingTime as estimateFromIndex } from './index';

const buildBody = (wordCount: number, separator = ' '): string =>
  Array.from({ length: wordCount }, (_, index) => `word${index}`).join(separator);

describe('estimateReadingTime', () => {
  it('[QP-SMTURBO-7-1] returns 3 minutes for a 450-word body', () => {
    expect(estimateReadingTime(buildBody(450))).toBe(3);
  });

  it('[QP-SMTURBO-7-2] returns 1 minute for a body of exactly 200 words', () => {
    expect(estimateReadingTime(buildBody(200))).toBe(1);
  });

  it('[QP-SMTURBO-7-3] rounds up to 2 minutes for a 201-word body', () => {
    expect(estimateReadingTime(buildBody(201))).toBe(2);
  });

  it('[QP-SMTURBO-7-4] returns 1 for a body with a single word', () => {
    expect(estimateReadingTime('word')).toBe(1);
  });

  it('[QP-SMTURBO-7-5] returns 0 for a whitespace-only body', () => {
    expect(estimateReadingTime('  ')).toBe(0);
  });

  it('[QP-SMTURBO-7-6] returns 0 for an empty body', () => {
    expect(estimateReadingTime('')).toBe(0);
  });

  it('[QP-SMTURBO-7-7] counts words separated by mixed whitespace runs', () => {
    expect(estimateReadingTime(buildBody(201, ' \t\n '))).toBe(2);
  });

  it('[QP-SMTURBO-7-8] is callable from other server code through the shared utils index', () => {
    expect(estimateFromIndex(buildBody(450))).toBe(3);
  });

  it('[QP-SMTURBO-7-9] unit test file beside the function passes', () => {
    expect(typeof estimateReadingTime).toBe('function');
  });
});
