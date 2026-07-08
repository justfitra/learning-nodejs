export class AppError extends Error {
  constructor(message = "Something wrong", status) {
    super(message);
    this.status = status;
  }
}
