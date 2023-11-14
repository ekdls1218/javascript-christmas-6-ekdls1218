import CustomError from './CustomError.js';
import ERROR from './constants/error.js';
import { STRINGS } from './constants/strings.js';

const Validator = {
  validDate(date) {
    this.isBetweenDate(date);
    this.isEmptyDate(date);
    this.isNotNumber(date);
  },

  validMenu(input, order) {
    this.isNotMenu(order);
    this.isOnlyDrink(order);
    this.isOverMenu(order);
    this.isDuplicationMenu(order);
    this.isDifferentInput(input);
    this.isMenuCount(order);
  },

  isBetweenDate(date) {
    if (date < STRINGS.EVENT_START_date || date > STRINGS.EVENT_END_date) {
      throw CustomError.date(ERROR.INVALID_DATE);
    }
  },

  isNotNumber(date) {
    if (STRINGS.REGEX_DATE.test(date)) {
      throw CustomError.date(ERROR.INVALID_DATE);
    }
  },

  isEmptyDate(date) {
    if (date.length === 0) {
      throw CustomError.date(ERROR.INVALID_DATE);
    }
  },

  isNotMenu(order) {
    if (order.length === 0) {
      throw CustomError.menu(ERROR.INVALID_ORDER);
    }
  },

  isOnlyDrink(order) {
    const refineOrder = order.filter((value) => value.type !== 'drink');

    if (refineOrder.length === 0) {
      throw CustomError.menu(ERROR.INVALID_ORDER);
    }
  },

  isOverMenu(order) {
    let sumCount;
    const menuCount = order.reduce((arr, menu) => {
      sumCount = arr + menu.count;
      return sumCount;
    }, 0);

    if (menuCount > 20) {
      throw CustomError.menu(ERROR.INVALID_ORDER);
    }
  },

  isDuplicationMenu(order) {
    const duplicationOrder = order.filter(
      (filterValue, idx, callback) =>
        idx === callback.findIndex((value) => value.name === filterValue.name),
    );

    if (duplicationOrder.length !== order.length) {
      throw CustomError.menu(ERROR.INVALID_ORDER);
    }
  },

  isDifferentInput(input) {
    const eachInput = input.split(',');

    eachInput.forEach((element) => {
      if (!STRINGS.REGEX_MENU_FORM.test(element)) {
        throw CustomError.menu(ERROR.INVALID_ORDER);
      }
    });
  },

  isMenuCount(order) {
    order.forEach((element) => {
      if (STRINGS.REGEX_MENU_COUNT.test(element.count)) {
        throw CustomError.menu(ERROR.INVALID_ORDER);
      }
    });
  },
};
export default Validator;
