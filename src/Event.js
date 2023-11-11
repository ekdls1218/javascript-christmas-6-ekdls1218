import CustomError from './CustomError.js';

class Event {
  constructor(date) {
    this.checkDate(date);
    this.date = date;
  }

  checkDate(date) {
    if (date < 1 || date > 31) {
      throw new CustomError('날짜를 다시 입력해주세요.');
    }
  }

  checkDdayEvent() {
    let discount = 0;
    if (this.date >= 1 && this.date <= 25) {
      discount = 1000 + (this.date - 1) * 100;
    }

    return discount;
  }
}
export default Event;
