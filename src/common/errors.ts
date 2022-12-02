import { BadRequest } from '@curveball/http-errors/dist';
import { ValidationError } from 'class-validator';

export class ValidationReqError extends BadRequest {
  public errors: any[];
  private readonly validationErrors: ValidationError[];

  constructor(message: string, validationErrors: ValidationError[]) {
    super(message);
    this.validationErrors = validationErrors;
    this.errors = [];
    this.parseValidationError();
  }

  private parseValidationError(): void {
    this.errors = this.validationErrors.map((e) => {
      e.constraints;
    });
  }
}
