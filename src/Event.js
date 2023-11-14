import CustomError from './CustomError.js';
import { getDayOfWeek } from './utils/utils.js';
import { STRINGS, DDAY, WEEK, SPECIAL } from './constants/strings.js';

class Event {
  #date;

  #discount;

  constructor(date) {
    this.checkDate(date);
    this.#date = date;
  }

  checkDate(date) {
    if (date < STRINGS.EVENT_START_date || date > STRINGS.EVENT_END_date) {
      throw new CustomError('날짜를 다시 입력해주세요.');
    }
  }

  checkDdayEvent() {
    this.resetDiscount();

    if (this.#date >= DDAY.START_DATE && this.#date <= DDAY.END_DATE) {
      this.#discount = DDAY.START_DISCOUNT + (this.#date - 1) * DDAY.INCREASE;
    }

    return this.#discount;
  }

  checkWeekEvent(count) {
    this.resetDiscount();
    this.#discount = count * WEEK.DISCOUNT;

    return this.#discount;
  }

  checkSpecialEvent() {
    const dayOfWeek = getDayOfWeek(this.#date);
    this.resetDiscount();

    if (dayOfWeek === STRINGS.SUNDAY || this.#date === SPECIAL.DATE) {
      this.#discount = SPECIAL.DISCOUNT;
    }

    return this.#discount;
  }

  resetDiscount() {
    this.#discount = 0;

    return this.#discount;
  }
}
export default Event;
