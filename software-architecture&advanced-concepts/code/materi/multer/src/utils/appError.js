export class AppError extends Error {
  constructor(message = "Shometing Error", status) {
    super(message);
    status = this.status;
  }
}
