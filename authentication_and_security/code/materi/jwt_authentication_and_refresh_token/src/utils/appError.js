export class AppError extends Error {
  constructor(message = "Shomething wrong", status) {
    super(message);
    this.status = status;
  }
}
