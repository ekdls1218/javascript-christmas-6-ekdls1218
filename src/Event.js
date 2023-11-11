class Event {
  #date;

  #discountAmount;

  constructor(date) {
    this.#date = date;
  }

  checkDate(date) {
    return date;
  }

  discount() {
    return null;
  }
}
export default Event;
