import ApplyEvent from './ApplyEvent.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import menu from './constants/menu.js';
import PROMPT from './constants/prompt.js';

class App {
  #visitDate;

  #orderSheet;

  #applyEvent;

  constructor() {
    this.#visitDate = '';
    this.#orderSheet = [];
  }

  async run() {
    OutputView.print(PROMPT.INTRODUCE);
    await this.inputDate();
    await this.inputMenu();
    this.#applyEvent = new ApplyEvent(this.#visitDate, this.#orderSheet);
  }

  async inputDate() {
    this.#visitDate = await InputView.readDate();

    // 에러처리
  }

  async inputMenu() {
    const inputOrderMenu = await InputView.readOrder();

    // 에러 처리

    this.#orderSheet = this.orderMenu(inputOrderMenu);
  }

  orderMenu(inputOrderMenu) {
    const commaSeparate = inputOrderMenu.split(',');

    const order = [];
    commaSeparate.forEach((eachMenu) => {
      order.push(...this.refineOrder(eachMenu));
    });

    return order;
  }

  refineOrder(eachMenu) {
    const hyphenSeparate = eachMenu.split('-');

    const orderFiltering = menu.filter(
      (vlaue) => vlaue.name === hyphenSeparate[0],
    );

    const insertCount = orderFiltering.map((value) => ({
      ...value,
      count: Number(hyphenSeparate[1]),
    }));

    return insertCount;
  }
}

export default App;
