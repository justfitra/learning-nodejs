export class AppError extends Error {
  constructor(message = "Internal Server Error", status) {
    super(message);
    this.status = status;
  }
}
