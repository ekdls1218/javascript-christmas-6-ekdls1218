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
    OutputView.previewPrint(this.#visitDate);
    this.printOrderSheet();
    this.printOrderPrice();
    this.printPresent();
    this.printBenefitList();
    this.printTotalBenefit();
    this.printPayment();
    this.printBadge();
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

  printOrderSheet() {
    OutputView.print(PROMPT.ORDER_MENU);

    this.#orderSheet.forEach((eachMenu) => {
      OutputView.printOrderMenu(eachMenu.name, eachMenu.count);
    });
  }

  printOrderPrice() {
    const orderAmount = this.#applyEvent.calculateOrderAmount();

    OutputView.print(PROMPT.TOTAL_AMOUNT);
    OutputView.printPrice(orderAmount);
  }

  printPresent() {
    const present = this.#applyEvent.checkPresentEvent();

    OutputView.print(PROMPT.PRESENT_MENU);

    if (present === 0) {
      return OutputView.print(PROMPT.NOTHING);
    }

    return OutputView.print(PROMPT.PRESENT);
  }

  printBenefitList() {
    const benefitList = this.#applyEvent.benefitList();

    OutputView.print(PROMPT.BENEFIT);

    if (benefitList.length === 0) {
      return OutputView.print(PROMPT.NOTHING);
    }

    const eachBenefit = benefitList.forEach((value) => {
      OutputView.printBenefit(value.name, value.discount);
    });

    return eachBenefit;
  }

  printTotalBenefit() {
    const totalBenefit = this.#applyEvent.calculateBenefitAmount();

    OutputView.print(PROMPT.TOTAL_BENEFIT);
    OutputView.printPrice(totalBenefit);
  }

  printPayment() {
    const payment = this.#applyEvent.calculatePayment();

    OutputView.print(PROMPT.PAYMENT);
    OutputView.printPrice(payment);
  }

  printBadge() {
    const badge = this.#applyEvent.checkBadgeEvent();

    OutputView.print(PROMPT.BADGE);
    OutputView.print(badge);
  }
}

export default App;
