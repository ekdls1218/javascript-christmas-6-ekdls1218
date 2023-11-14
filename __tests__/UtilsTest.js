import { getDayOfWeek } from '../src/utils/utils.js';

test.each([
  [3, 0],
  [4, 1],
  [5, 2],
  [6, 3],
  [7, 4],
  [8, 5],
  [9, 6],
])('요일 테스트', (input, output) => {
  const dayOfWeek = getDayOfWeek(input);

  expect(dayOfWeek).toBe(output);
});
