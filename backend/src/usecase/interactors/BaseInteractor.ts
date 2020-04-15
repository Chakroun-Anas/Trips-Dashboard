import { BadData } from "./../../domain/errors";

export interface DataValidation {
  value: any;
  isValid: Function;
  errorMsg: string;
}

export class BaseInteractor {
  validateData(data: Map<string, DataValidation>): void {
    const errors: Map<string, string> = new Map();
    for (const dataKey of data.keys()) {
      const { value, isValid, errorMsg } = data.get(dataKey);
      if (!isValid(value)) {
        errors.set(dataKey, errorMsg);
      }
    }
    if (errors.size !== 0) {
      throw new BadData(errors);
    }
  }
}
