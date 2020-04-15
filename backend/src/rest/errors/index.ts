import { DomainError, BadData } from "./../../domain/errors/index";

export class RestError {
  status: string;
  code: number;
  reason: string | null;
  constructor(status: string, code: number, reason: string = null) {
    this.status = status;
    this.code = code;
    this.reason = reason;
  }
}

export class BadRequest extends RestError {
  constructor(reason: string) {
    super("Bad Request", 400, reason);
  }
}

export class InternalServerError extends RestError {
  constructor() {
    super("Internal Server Error", 500);
  }
}

export function domainErrorToRestError(domainError: DomainError): RestError {
  if (domainError instanceof BadData) {
    return new BadRequest(domainError.message);
  } else {
    return new InternalServerError();
  }
}
