export class AppError extends Error {
  constructor(message = "Shometing Wrong", status) {
    super(message);
    this.status = status;
  }
}
