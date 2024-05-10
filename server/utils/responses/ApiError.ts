class ApiError {
    statusCode: number;
    message: string;
    data: null;
    success: boolean;
    errors: any[];

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: any[] = [],
    ) {
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
    }
}

class CustomError extends Error {
    statusCode:number

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }
}

function getStatusCodeFromError(error: any) {
    if (error.message.includes('validation')) {
      return 400;
    } else if (error.message.includes('unauthorized')) {
      return 401;
    } else {
      return 500;
    }
  }

export { ApiError, CustomError, getStatusCodeFromError };