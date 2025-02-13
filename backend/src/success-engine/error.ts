export class CustomError extends Error {
    constructor(public statusCode: number, public message: string, public errors?: any) {
      super(message);
    }
  }
  
  export class BadRequestError extends CustomError {
    constructor(message: string = 'Bad Request', errors?: any) {
      super(400, message, errors);
    }
  }
  
  export class ValidationError extends CustomError {
    constructor(errors: any) {
      super(400, 'Validation Error', errors);
    }
  }
  
  export class UnauthorizedError extends CustomError {
    constructor(message: string = 'Unauthorized') {
      super(401, message);
    }
  }
  
  export class NotFoundError extends CustomError {
    constructor(message: string = 'Not Found') {
      super(404, message);
    }
  }
  
  export class InternalServerError extends CustomError {
    constructor(message: string = 'Internal Server Error') {
      super(500, message);
    }
  }
  
  