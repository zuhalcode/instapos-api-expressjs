import { Response } from "express";
import { AppError } from "./errors";
import { ValidationError } from "yup";

type Pagination = {
  totalPages: number;
  current: number;
  total: number;
};

export default {
  success(res: Response, data: any, message: string) {
    res.status(200).json({
      meta: {
        status: 200,
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
    } else if (error instanceof ValidationError) {
      res.status(400).json({
        meta: {
          status: 400,
          message: "Validation error",
        },
        data: error.errors,
      });
    } else {
      res.status(500).json({
        meta: {
          status: 500,
          message: "Internal server error",
        },
        data: null,
      });
    }
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
