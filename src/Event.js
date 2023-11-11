import CustomError from './CustomError.js';

class Event {
  #date;

  #discount;

  #dayOfWeek;

  constructor(date) {
    this.checkDate(date);
    this.#date = date;
    this.getDayOfWeek(date);
  }

  checkDate(date) {
    if (date < 1 || date > 31) {
      throw new CustomError('날짜를 다시 입력해주세요.');
    }
  }

  checkDdayEvent() {
    this.resetDiscount();

    if (this.#date >= 1 && this.#date <= 25) {
      this.#discount = 1000 + (this.#date - 1) * 100;
    }

    return this.#discount;
  }

  checkWeekEvent(count) {
    this.resetDiscount();
    this.#discount = count * 2023;

    return this.#discount;
  }

  checkSpecialEvent() {
    this.resetDiscount();

    if (this.#dayOfWeek === 0 || this.#date === 25) {
      this.#discount = 1000;
    }

    return this.#discount;
  }

  getDayOfWeek(date) {
    this.#dayOfWeek = new Date(2023, 11, date).getDay();

    return this.#dayOfWeek;
  }

  resetDiscount() {
    this.#discount = 0;

    return this.#discount;
  }
}
export default Event;
