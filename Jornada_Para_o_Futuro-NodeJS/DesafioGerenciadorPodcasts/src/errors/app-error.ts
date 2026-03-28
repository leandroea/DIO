export abstract class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class PodcastNotFoundError extends AppError {
  constructor(podcastName?: string) {
    const message = podcastName
      ? `Podcast with name '${podcastName}' not found`
      : 'Podcast not found';
    super(message, 404);
    Object.setPrototypeOf(this, PodcastNotFoundError.prototype);
  }
}

export class InvalidInputError extends AppError {
  constructor(message: string) {
    super(message, 400);
    Object.setPrototypeOf(this, InvalidInputError.prototype);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 500);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export class FileReadError extends AppError {
  constructor(message: string = 'Failed to read data file') {
    super(message, 500);
    Object.setPrototypeOf(this, FileReadError.prototype);
  }
}