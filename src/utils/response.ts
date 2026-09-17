import { Response } from "express";
import { AppError } from "./errors";
import { ZodError } from "zod";

type Pagination = {
  totalPages: number;
  current: number;
  total: number;
};

const ERRORS: Record<string, [number, string]> = {
  invalid_credentials: [401, "Invalid email or password"],
  validation_failed: [400, "Invalid request"],
  "23505": [409, "Resource already exists"],
  "23503": [409, "Referenced resource does not exist"],
  "23502": [400, "Required field is missing"],
  "42883": [404, "Requested operation is unavailable"],
  "42P01": [404, "Requested resource not found"],
  "42501": [403, "Insufficient privileges"],
  PGRST116: [404, "Data not found"],
};

export default {
  success(res: Response, data: any, message: string, statusCode = 200) {
    res.status(statusCode).json({
      meta: {
        status: statusCode,
        message,
      },
      data,
    });
  },

  error(res: Response, error: unknown) {
    console.error(error);

    if (error instanceof AppError) {
      res.status(error.status).json({
        meta: {
          status: error.status,
          message: error.message,
        },
        data: error.data,
      });
    }

    if (error instanceof ZodError) {
      res.status(400).json({
        meta: {
          status: 400,
          message: "Validation error",
        },
        data: error.issues,
      });
    }

    let status = 500;
    let message = "Internal server error";

    if (typeof error === "object" && error !== null) {
      const errorCode =
        "code" in error && typeof error.code === "string"
          ? error.code
          : undefined;

      const errorStatus =
        "status" in error && typeof error.status === "number"
          ? error.status
          : undefined;

      if (errorCode && ERRORS[errorCode]) {
        [status, message] = ERRORS[errorCode];
      } else if (errorStatus === 401) {
        status = 401;
        message = "Unauthorized";
      } else if (errorStatus && errorStatus >= 400 && errorStatus < 500) {
        status = errorStatus;
        message = "Request failed";
      }
    }

    res.status(status).json({
      meta: { status, message },
      data: null,
    });
  },

  unauthorized(res: Response, message: string = "unauthorized") {
    res.status(403).json({
      meta: {
        status: 403,
        message,
      },
      data: null,
    });
  },

  pagination(
    res: Response,
    data: any[],
    pagination: Pagination,
    message: string,
  ) {
    res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
      pagination,
    });
  },

  notFound() {},
};
