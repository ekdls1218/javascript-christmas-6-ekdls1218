class ApplyEvent {
  #inputDate;

  #inputMenu;

  #inputMenuCount;

  constructor(inputDate, inputMenu, inputMenuCount) {
    this.#inputDate = inputDate;
    this.#inputMenu = inputMenu;
    this.#inputMenuCount = inputMenuCount;
  }
}
export default ApplyEvent;
