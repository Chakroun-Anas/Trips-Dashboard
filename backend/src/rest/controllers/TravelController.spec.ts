import { BadData } from "./../../domain/errors/index";
import {
  DestinationCountryName,
  FixedAgeRanges,
  NativeCountryName,
  Gender,
} from "./../../domain/entities/index";
import { TravelController } from "./TravelController";

function getTravelController(travelInteractor: any) {
  return new TravelController(travelInteractor);
}

function mockRequest(options: any): any {
  const req: any = { ...options };
  return req;
}

function mockResponse() {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

function validResponseAssertions(res: any, data: any) {
  expect(res.status.mock.calls.length).toBe(1);
  expect(res.status.mock.calls[0][0]).toBe(200);
  expect(res.send.mock.calls.length).toBe(1);
  expect(res.send.mock.calls[0][0]).toEqual(data);
}

function invalidDateAssertions(res: any) {
  expect(res.status.mock.calls.length).toBe(1);
  expect(res.status.mock.calls[0][0]).toBe(400);
  expect(res.send.mock.calls.length).toBe(1);
  expect(res.send.mock.calls[0][0]).toBe(
    "The following data are invalid: date."
  );
}

describe("Travel Controller", () => {
  test("Get countries total travelers: valid date", async (done) => {
    expect.assertions(4);
    const travelController: TravelController = getTravelController({
      getCountriesTotalTravelers: jest.fn(
        async (date: string): Promise<Map<DestinationCountryName, number>> => {
          const countriesTotalTravelers: Map<
            DestinationCountryName,
            number
          > = new Map();
          countriesTotalTravelers.set(DestinationCountryName.FRANCE, 3);
          return countriesTotalTravelers;
        }
      ),
    });
    const req: any = mockRequest({
      params: {
        date: "04-10-2020",
      },
    });
    const res: any = mockResponse();
    await travelController.getCountriesTotalTravelers(req, res);
    validResponseAssertions(res, {
      FRANCE: 3,
    });
    done();
  });
  test("Get countries total travelers: invalid date", async (done) => {
    expect.assertions(4);
    const travelController: TravelController = getTravelController({
      getCountriesTotalTravelers: jest.fn(
        async (date: string): Promise<Map<DestinationCountryName, number>> => {
          const errors: Map<string, string> = new Map();
          errors.set("date", "The indicated date is not valid");
          throw new BadData(errors);
        }
      ),
    });
    const req: any = mockRequest({
      params: {
        date: "something",
      },
    });
    const res: any = mockResponse();
    await travelController.getCountriesTotalTravelers(req, res);
    invalidDateAssertions(res);
    done();
  });
  test("Get countries total travelers by gender: valid date", async (done) => {
    expect.assertions(4);
    const travelController: TravelController = getTravelController({
      getCountriesTotalTravelersByAgeRange: jest.fn(
        async (
          date: string
        ): Promise<
          Map<DestinationCountryName, Map<FixedAgeRanges, number>>
        > => {
          const countriesTotalTravelersByAgeRange: Map<
            DestinationCountryName,
            Map<FixedAgeRanges, number>
          > = new Map();
          countriesTotalTravelersByAgeRange.set(
            DestinationCountryName.FRANCE,
            new Map([
              [FixedAgeRanges["18_34"], 0],
              [FixedAgeRanges["35_50"], 0],
              [FixedAgeRanges["51_75"], 0],
              [FixedAgeRanges["+75"], 1],
            ])
          );
          return countriesTotalTravelersByAgeRange;
        }
      ),
    });
    const req: any = mockRequest({
      params: {
        date: "04-10-2020",
      },
    });
    const res: any = mockResponse();
    await travelController.getCountriesTotalTravelersByAgeRange(req, res);
    validResponseAssertions(res, {
      FRANCE: {
        "18_34": 0,
        "35_50": 0,
        "51_75": 0,
        "+75": 1,
      },
    });
    done();
  });
  test("Get countries total travelers by gender: invalid date", async (done) => {
    expect.assertions(4);
    const travelController: TravelController = getTravelController({
      getCountriesTotalTravelersByAgeRange: jest.fn(
        async (
          date: string
        ): Promise<
          Map<DestinationCountryName, Map<FixedAgeRanges, number>>
        > => {
          const errors: Map<string, string> = new Map();
          errors.set("date", "The indicated date is not valid");
          throw new BadData(errors);
        }
      ),
    });
    const req: any = mockRequest({
      params: {
        date: "04-10-2020",
      },
    });
    const res: any = mockResponse();
    await travelController.getCountriesTotalTravelersByAgeRange(req, res);
    invalidDateAssertions(res);
    done();
  });
  test("Get countries total travelers by nationality: valid date", async (done) => {
    expect.assertions(4);
    const travelController: TravelController = getTravelController({
      getCountriesTotalTravelersByNationality: jest.fn(
        async (
          date: string
        ): Promise<
          Map<DestinationCountryName, Map<NativeCountryName, number>>
        > => {
          const countriesTotalTravelersByNationality: Map<
            DestinationCountryName,
            Map<NativeCountryName, number>
          > = new Map();
          countriesTotalTravelersByNationality.set(
            DestinationCountryName.FRANCE,
            new Map([[NativeCountryName.MOROCCO, 2]])
          );
          return countriesTotalTravelersByNationality;
        }
      ),
    });
    const req: any = mockRequest({
      params: {
        date: "04-10-2020",
      },
    });
    const res: any = mockResponse();
    await travelController.getCountriesTotalTravelersByNationality(req, res);
    validResponseAssertions(res, {
      FRANCE: {
        MOROCCO: 2,
      },
    });
    done();
  });
  test("Get countries total travelers by nationality: invalid date", async (done) => {
    expect.assertions(4);
    const travelController: TravelController = getTravelController({
      getCountriesTotalTravelersByNationality: jest.fn(
        async (
          date: string
        ): Promise<
          Map<DestinationCountryName, Map<NativeCountryName, number>>
        > => {
          const errors: Map<string, string> = new Map();
          errors.set("date", "The indicated date is not valid");
          throw new BadData(errors);
        }
      ),
    });
    const req: any = mockRequest({
      params: {
        date: "04-10-2020",
      },
    });
    const res: any = mockResponse();
    await travelController.getCountriesTotalTravelersByNationality(req, res);
    invalidDateAssertions(res);
    done();
  });
  test("Get countries total travelers by gender: valid date", async (done) => {
    expect.assertions(4);
    const travelController: TravelController = getTravelController({
      getCountriesTotalTravelersByGender: jest.fn(
        async (
          date: string
        ): Promise<Map<DestinationCountryName, Map<Gender, number>>> => {
          const countriesTotalTravelersByGender: Map<
            DestinationCountryName,
            Map<Gender, number>
          > = new Map();
          countriesTotalTravelersByGender.set(
            DestinationCountryName.FRANCE,
            new Map([
              [Gender.MALE, 2],
              [Gender.FEMALE, 1],
            ])
          );
          return countriesTotalTravelersByGender;
        }
      ),
    });
    const req: any = mockRequest({
      params: {
        date: "04-10-2020",
      },
    });
    const res: any = mockResponse();
    await travelController.getCountriesTotalTravelersByGender(req, res);
    validResponseAssertions(res, {
      FRANCE: {
        MALE: 2,
        FEMALE: 1,
      },
    });
    done();
  });
  test("Get countries total travelers by gender: invalid date", async (done) => {
    expect.assertions(4);
    const travelController: TravelController = getTravelController({
      getCountriesTotalTravelersByGender: jest.fn(
        async (
          date: string
        ): Promise<Map<DestinationCountryName, Map<Gender, number>>> => {
          const errors: Map<string, string> = new Map();
          errors.set("date", "The indicated date is not valid");
          throw new BadData(errors);
        }
      ),
    });
    const req: any = mockRequest({
      params: {
        date: "04-10-2020",
      },
    });
    const res: any = mockResponse();
    await travelController.getCountriesTotalTravelersByGender(req, res);
    invalidDateAssertions(res);
    done();
  });
});
