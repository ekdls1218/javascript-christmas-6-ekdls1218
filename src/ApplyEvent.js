import Event from './Event.js';
import getDayOfWeek from './utils/utils.js';

class ApplyEvent {
  #inputDate;

  #inputMenu;

  #orderAmount;

  #discount = {};

  // 임시 구현
  menu = [
    { name: '티본스테이크', price: 55000, type: 'main', count: 1 },
    { name: '바비큐립', price: 54000, type: 'main', count: 1 },
    { name: '초코케이크', price: 15000, type: 'dessert', count: 2 },
    { name: '제로콜라', price: 3000, type: 'drink', count: 1 },
  ];

  constructor(inputDate, inputMenu) {
    this.#inputDate = inputDate;
    this.#inputMenu = inputMenu;
    this.#orderAmount = this.calculateOrderAmount();
    this.#discount = this.benefitList();
  }

  calculateOrderAmount() {
    let sumPrice;
    this.#orderAmount = this.#inputMenu.reduce((accumulator, order) => {
      sumPrice = accumulator + order.price * order.count;

      return sumPrice;
    }, 0);

    return this.#orderAmount;
  }

  calculateDiscountAmount() {
    let sumPrice;
    const discountArray = Object.values(this.#discount);
    const discountAmount = discountArray.reduce((accumulator, discount) => {
      sumPrice = accumulator + discount;

      return sumPrice;
    }, 0);

    return discountAmount;
  }

  calculateBenefitAmount() {
    const discountAmount = this.calculateDiscountAmount();
    const present = this.checkPresentEvent();

    const benefitAmount = discountAmount + present;

    return benefitAmount;
  }

  calculatePayment() {
    const discountAmount = this.calculateDiscountAmount();

    const payment = this.#orderAmount - discountAmount;

    return payment;
  }

  checkPresentEvent() {
    let present = 0;
    if (this.#orderAmount >= 120000) {
      present = 25000;
      return present;
    }
    return present;
  }

  benefitList() {
    if (this.#orderAmount >= 10000) {
      const discountEvent = new Event(this.#inputDate);
      const count = this.checkWeek();

      const dday = discountEvent.checkDdayEvent();
      const week = discountEvent.checkWeekEvent(count);
      const special = discountEvent.checkSpecialEvent();

      this.#discount = { dday, week, special };
    }
    return this.#discount;
  }

  checkWeek() {
    let count = 0;
    const dayOfWeek = getDayOfWeek(this.#inputDate);

    if (dayOfWeek === 5 || dayOfWeek === 6) {
      count = this.countMenu('main');

      return count;
    }

    count = this.countMenu('dessert');

    return count;
  }

  countMenu(type) {
    const typeMenus = this.#inputMenu.filter((value) => value.type === type);

    let count;
    const typeCount = typeMenus.reduce((accumulator, menuType) => {
      count = accumulator + menuType.count;

      return count;
    }, 0);

    return typeCount;
  }

  checkBadgeEvent() {
    const benefitAmount = this.calculateBenefitAmount();

    if (benefitAmount >= 5000 && benefitAmount < 10000) return '별';

    if (benefitAmount >= 10000 && benefitAmount < 20000) return '트리';

    if (benefitAmount >= 20000) return '산타';

    return '없음';
  }
}
export default ApplyEvent;
