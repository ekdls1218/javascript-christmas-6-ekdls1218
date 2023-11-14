import { getDayOfWeek } from './utils/utils.js';
import { STRINGS, DDAY, WEEK, SPECIAL } from './constants/strings.js';

class Event {
  #date;

  #discount;

  constructor(date) {
    this.#date = date;
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
