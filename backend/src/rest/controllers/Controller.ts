import { DomainError } from "./../../domain/errors";
import { Response } from "express";
import { RestError, domainErrorToRestError } from "../errors";

export class Controller {
  handleError(domainError: DomainError, res: Response) {
    const restError: RestError = domainErrorToRestError(domainError);
    if (restError.reason) {
      res.status(restError.code).send(restError.reason);
    } else {
      res.status(restError.code).send();
    }
  }
}
