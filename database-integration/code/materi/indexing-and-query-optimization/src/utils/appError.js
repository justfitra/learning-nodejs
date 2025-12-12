export class AppError extends Error {
  constructor(messagge = "Internal Server Error", status) {
    super(messagge);
    this.status = status;
  }
}
