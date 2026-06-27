export class AppError extends Error {
  constructor(message = "shomething is wrong", status) {
    super(message);
    this.status = status;
  }
}
