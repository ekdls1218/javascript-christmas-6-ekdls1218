import { Console } from '@woowacourse/mission-utils';
import { STRINGS } from './constants/strings.js';
import PROMPT from './constants/prompt.js';

const OutputView = {
  print(message) {
    Console.print(message);
  },

  previewPrint(inputDate) {
    Console.print(`${STRINGS.MONTH} ${inputDate}일${PROMPT.PREVIEW}`);
  },

  printOrderMenu(name, count) {
    Console.print(`${name} ${count}개`);
  },

  printPrice(price) {
    Console.print(`${price}원`);
  },

  printBenefit(name, discount) {
    Console.print(`${name} ${discount}원`);
  },
};
export default OutputView;
