import Event from './Event.js';
import getDayOfWeek from './utils/utils.js';

class ApplyEvent {
  #inputDate;

  #inputMenu;

  #discountEvent;

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
    this.#discountEvent = new Event(inputDate);
  }

  calculateOrderAmount() {
    let sumPrice;
    this.#orderAmount = this.menu.reduce((accumulator, order) => {
      sumPrice = accumulator + order.price * order.count;

      return sumPrice;
    }, 0);

    return this.#orderAmount;
  }

  calculateDiscountAmount() {
    let sumPrice;
    const discounArray = Object.values(this.#discount);
    const discountAmount = discounArray.reduce((accumulator, discount) => {
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
      const count = this.checkWeek();

      const dday = this.#discountEvent.checkDdayEvent();
      const week = this.#discountEvent.checkWeekEvent(count);
      const special = this.#discountEvent.checkSpecialEvent();

      this.#discount = { dday, week, special };
    }
    return this.#discount;
  }

  checkWeek() {
    let count = 0;
    const dayOfWeek = getDayOfWeek(this.#inputDate);

    if (dayOfWeek === 5 || dayOfWeek === 6) {
      count = this.countmenu('main');
      return count;
    }

    count = this.countmenu('dessert');
    return count;
  }

  countmenu(type) {
    const countmMenus = this.menu.filter((value) => value.type === type).length;

    return countmMenus;
  }

  checkBadgeEvent() {
    const benefitAmount = this.calculateBenefitAmount();

    if (benefitAmount >= 5000 && benefitAmount < 10000) {
      return '별';
    }

    if (benefitAmount >= 10000 && benefitAmount < 20000) {
      return '트리';
    }

    if (benefitAmount >= 20000) {
      return '산타';
    }
  }
}
export default ApplyEvent;
