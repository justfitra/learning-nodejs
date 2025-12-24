export class AppError extends Error {
  constructor(message = "Something Wrong", status) {
    super(message);
    this.status = status;
  }
}
