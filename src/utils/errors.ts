export class AppError extends Error {
  constructor(
    public status: number,
    message: string,
    public data: unknown = null,
  ) {
    super(message);
    this.name = "AppError";
  }
}
