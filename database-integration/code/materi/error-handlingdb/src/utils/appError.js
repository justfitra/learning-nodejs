export class AppError extends Error {
  constructor(message = "error something wrong", status) {
    super(message);
    this.status = status;
  }
}
