class ApplyEvent {
  #inputDate;

  #inputMenu;

  #discountEvent;

  #orderAmount;

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

  checkPresentEvent() {
    let present = 0;
    if (this.#orderAmount >= 120000) {
      present = 25000;
      return present;
    }
    return present;
  }
}
export default ApplyEvent;
