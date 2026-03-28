import { IncomingMessage, ServerResponse } from "http";
import { AppError } from "../errors/app-error";
import { ContentType } from "../utils/content-type";
import { StatusCode } from "../utils/status-code";

interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  timestamp: string;
}

export const errorHandler = (
  error: Error,
  req: IncomingMessage,
  res: ServerResponse
): void => {
  console.error(`[ERROR] ${error.message}`);

  let errorResponse: ErrorResponse;

  if (error instanceof AppError) {
    errorResponse = {
      statusCode: error.statusCode,
      error: error.name,
      message: error.message,
      timestamp: new Date().toISOString(),
    };
  } else {
    errorResponse = {
      statusCode: StatusCode.InternalServerError,
      error: "InternalServerError",
      message: "An unexpected error occurred",
      timestamp: new Date().toISOString(),
    };
  }

  res.writeHead(errorResponse.statusCode, {
    "Content-Type": ContentType.JSON,
  });

  res.write(JSON.stringify(errorResponse));
  res.end();
};

export const notFoundHandler = (
  req: IncomingMessage,
  res: ServerResponse
): void => {
  const errorResponse: ErrorResponse = {
    statusCode: StatusCode.NotFound,
    error: "NotFound",
    message: `Route ${req.url} not found`,
    timestamp: new Date().toISOString(),
  };

  res.writeHead(StatusCode.NotFound, {
    "Content-Type": ContentType.JSON,
  });

  res.write(JSON.stringify(errorResponse));
  res.end();
};