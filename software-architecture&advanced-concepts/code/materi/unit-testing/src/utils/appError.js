export class AppError extends Error {
  constructor(message = "Something was wrong", status) {
    super(message);
    this.status = status;
  }
}
