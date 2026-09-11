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

export function translateDatabaseError(error: unknown): AppError {
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
      ? error.code
      : undefined;

  switch (code) {
    case "23505":
      return new AppError(409, "Resource already exists");

    case "23503":
      return new AppError(409, "Referenced resource does not exist");

    case "23502":
      return new AppError(400, "Required field is missing");

    case "42883":
      return new AppError(404, "Requested operation is unavailable");

    case "42P01":
      return new AppError(404, "Requested resource not found");

    case "42501":
      return new AppError(403, "Insufficient privileges");

    case code?.startsWith("08"):
      return new AppError(503, "Database connection error");

    case code?.startsWith("53"):
      return new AppError(503, "Service temporarily unavailable");

    case "PGRST116":
      return new AppError(404, "Data Not Found");

    default:
      return new AppError(500, "Internal Server Error");
  }
}
