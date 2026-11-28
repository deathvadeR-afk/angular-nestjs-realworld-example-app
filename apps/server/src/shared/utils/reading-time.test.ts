import { estimateReadingTime } from './reading-time';
import * as sharedUtils from './index';

const repeatWords = (count: number, separator = ' '): string =>
  Array.from({ length: count }, () => 'word').join(separator);

describe('estimateReadingTime', () => {
  it('[QP-SMTURBO-5-1] returns 3 minutes for a body of 450 words', () => {
    expect(estimateReadingTime(repeatWords(450))).toBe(3);
  });

  it('[QP-SMTURBO-5-2] returns 1 minute for a body of exactly 200 words', () => {
    expect(estimateReadingTime(repeatWords(200))).toBe(1);
  });

  it('[QP-SMTURBO-5-3] returns 2 minutes for a body of 201 words', () => {
    expect(estimateReadingTime(repeatWords(201))).toBe(2);
  });

  it('[QP-SMTURBO-5-4] returns 1 minute for a body with a single word', () => {
    expect(estimateReadingTime('word')).toBe(1);
  });

  it('[QP-SMTURBO-5-5] returns 0 minutes for a body of two spaces', () => {
    expect(estimateReadingTime('  ')).toBe(0);
  });

  it('[QP-SMTURBO-5-6] returns 0 minutes for an empty body', () => {
    expect(estimateReadingTime('')).toBe(0);
  });

  it('[QP-SMTURBO-5-7] counts words separated by mixed whitespace runs', () => {
    const separators = [' ', '\t', '\n', ' \t\n  '];
    const body = Array.from({ length: 400 }, () => 'word')
      .map((word, index) => (index === 0 ? word : `${separators[index % separators.length]}${word}`))
      .join('');

    // 400 words at 200 words per minute is exactly 2 minutes
    expect(estimateReadingTime(body)).toBe(2);
  });

  it('[QP-SMTURBO-5-8] is callable from other server code and returns the estimate', () => {
    const body = repeatWords(450);

    expect(sharedUtils.estimateReadingTime(body)).toBe(3);
  });
});
