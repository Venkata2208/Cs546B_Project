class ServerError extends Error {
    /**
   *
   * @param {*} status
   * @param {*} message
   * @param {*} description
   */
    constructor(status, message, description ='') {
      super(message);
      this.status = status;
      this.message = message;
      this.description = description;
    }
  }
  
  module.exports = ServerError;
  