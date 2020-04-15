import VError from "verror";
import mapToObj from "../../helpers/map-to-obj";

export class DomainError extends VError {
  error: Error;
  info: { [key: string]: any };
  constructor(
    name: string,
    info: { [key: string]: any },
    message: string,
    cause?: Error
  ) {
    super(
      {
        name,
        cause,
        info,
      },
      message
    );
  }
}

export class BadData extends DomainError {
  constructor(info: Map<string, string>, error?: Error) {
    let message: string = "The following data are invalid: ";
    const nbrOfErrors: number = info.size;
    let index: number = 0;
    for (const prop of info.keys()) {
      message += `${
        nbrOfErrors > 2 && index === nbrOfErrors - 1 ? "and " : ""
      }${prop}${nbrOfErrors > 1 && index !== nbrOfErrors - 1 ? ", " : ""}${
        index === nbrOfErrors - 1 ? "." : ""
      }`;
    }
    super("BAD_DATA", mapToObj(info), message, error);
  }
}
