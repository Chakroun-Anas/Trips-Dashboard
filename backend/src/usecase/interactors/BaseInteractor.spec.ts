import { VError } from "verror";
import { BadData } from "./../../domain/errors/index";
import { BaseInteractor } from "./BaseInteractor";
describe("Base Interactor", () => {
  const baseInteractor: BaseInteractor = new BaseInteractor();
  test("Data validation", () => {
    expect.assertions(4);
    const validData: Map<
      string,
      { value: any; isValid: Function; errorMsg: string }
    > = new Map();
    validData.set("date", {
      value: "04-10-2020",
      isValid: (value: any) => {
        return typeof value === "string" && !isNaN(Date.parse(value));
      },
      errorMsg: "The indicated date is not valid",
    });
    expect(() => baseInteractor.validateData(validData)).not.toThrow();
    const invalidData: Map<
      string,
      { value: any; isValid: Function; errorMsg: string }
    > = new Map();
    invalidData.set("date", {
      value: "something",
      isValid: (value: any) => {
        return typeof value === "string" && !isNaN(Date.parse(value));
      },
      errorMsg: "The indicated date is not valid",
    });
    expect(() => baseInteractor.validateData(invalidData)).toThrow();
    try {
      baseInteractor.validateData(invalidData);
    } catch (error) {
      expect(error).toBeInstanceOf(BadData);
      expect(VError.info(error)["date"]).toBe(
        "The indicated date is not valid"
      );
    }
  });
});
