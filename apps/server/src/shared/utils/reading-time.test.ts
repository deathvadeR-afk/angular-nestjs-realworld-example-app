import { calculateReadingTime } from './reading-time';
import * as sharedUtils from './index';

const words = (count: number, separator = ' '): string =>
  Array.from({ length: count }, () => 'word').join(separator);

describe('calculateReadingTime', () => {
  it('[QP-SMTURBO-8-1] returns 3 minutes for a 450-word body', () => {
    expect(calculateReadingTime(words(450))).toBe(3);
  });

  it('[QP-SMTURBO-8-2] returns 1 minute for a 200-word body', () => {
    expect(calculateReadingTime(words(200))).toBe(1);
  });

  it('[QP-SMTURBO-8-3] returns 2 minutes for a 201-word body', () => {
    expect(calculateReadingTime(words(201))).toBe(2);
  });

  it('[QP-SMTURBO-8-4] returns the minimum of 1 minute for a single-word body', () => {
    expect(calculateReadingTime('Hello')).toBe(1);
  });

  it('[QP-SMTURBO-8-5] returns 0 minutes for an empty body', () => {
    expect(calculateReadingTime('')).toBe(0);
  });

  it('[QP-SMTURBO-8-6] does not give the one-minute minimum to a whitespace-only body', () => {
    expect(calculateReadingTime('  ')).toBe(0);
  });

  it('[QP-SMTURBO-8-7] counts tabs, newlines and repeated spaces as word separators', () => {
    const separators = ['\t', '\n', '   ', ' \t\n  '];
    let body = '  \n\t ';
    for (let i = 0; i < 201; i++) {
      body += i === 0 ? 'word' : `${separators[i % separators.length]}word`;
    }
    body += ' \n\t  ';

    expect(calculateReadingTime(body)).toBe(2);
  });

  it('[QP-SMTURBO-8-8] is importable from the shared utilities folder by other server code', () => {
    expect(sharedUtils.calculateReadingTime(words(450))).toBe(3);
  });
});
