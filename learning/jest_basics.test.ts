function sum(a: number, b: number): number {
  return a + b;
}

describe('sum function', () => {
  test('should return correct sum of numbers', () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
  });
});
