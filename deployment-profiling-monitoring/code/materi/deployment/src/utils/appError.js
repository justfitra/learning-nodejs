export class AppError extends Error {
  constructor(message = "Something Worng", status) {
    super(message);
    this.status = status;
  }
}
