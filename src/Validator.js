import CustomError from './CustomError.js';
import ERROR from './constants/error.js';

const Validator = {
  validDate(date) {
    this.isBetweenDate(date);
    this.isEmptyDate(date);
    this.isNotNumber(date);
  },

  isBetweenDate(date) {
    if (date < 1 || date > 31) {
      throw CustomError.date(ERROR.INVALID_DATE);
    }
  },

  isNotNumber(date) {
    if (/[^0-9]/.test(date)) {
      throw CustomError.date(ERROR.INVALID_DATE);
    }
  },

  isEmptyDate(date) {
    if (date.length === 0) {
      throw CustomError.date(ERROR.INVALID_DATE);
    }
  },
};
export default Validator;
