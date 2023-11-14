import ERROR from './constants/error.js';

class CustomError extends Error {
  constructor(message, name) {
    super(`${ERROR.ERROR} ${message}`);
    this.name = name;
  }

  static date(message) {
    return new CustomError(message, ERROR.name.DATE);
  }
}
export default CustomError;
