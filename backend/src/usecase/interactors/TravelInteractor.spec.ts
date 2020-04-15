import { TravelRepository } from "./../repositories/TravelRepository";
import { TravelInteractor } from "./TravelInteractor";
import { TravelBoundary } from "./../boundaries/TravelBoundary";
import {
  Gender,
  NativeCountryName,
  DestinationCountryName,
  FixedAgeRanges,
  DestinationCountry,
  AgeRange,
} from "../../domain/entities";

function mockTravelRepository() {
  const mockGetDestinationCountries = jest.fn(
    async (): Promise<Array<DestinationCountry>> => {
      return [
        {
          name: DestinationCountryName.FRANCE,
        },
        {
          name: DestinationCountryName.EGYPT,
        },
        {
          name: DestinationCountryName.JAPAN,
        },
        {
          name: DestinationCountryName.RUSSIA,
        },
        {
          name: DestinationCountryName.TURKEY,
        },
      ];
    }
  );

  const mockGetTotalTravelers = jest.fn(
    async (
      destinationCountry: DestinationCountryName,
      date: Date
    ): Promise<number> => {
      if (destinationCountry === DestinationCountryName.FRANCE) {
        return 4;
      } else if (destinationCountry === DestinationCountryName.EGYPT) {
        return 3;
      } else if (destinationCountry === DestinationCountryName.TURKEY) {
        return 1;
      } else {
        return 0;
      }
    }
  );

  const mockGetTotalTravelersByNationality = jest.fn(
    async (
      destinationCountryName: DestinationCountryName,
      date: Date,
      travelersNativeCountryName: NativeCountryName
    ): Promise<number> => {
      if (
        destinationCountryName === DestinationCountryName.FRANCE &&
        travelersNativeCountryName === NativeCountryName.MOROCCO
      ) {
        return 2;
      } else if (
        destinationCountryName === DestinationCountryName.FRANCE &&
        travelersNativeCountryName === NativeCountryName.CHINA
      ) {
        return 1;
      } else if (
        destinationCountryName === DestinationCountryName.FRANCE &&
        travelersNativeCountryName === NativeCountryName.ITALY
      ) {
        return 1;
      } else if (
        destinationCountryName === DestinationCountryName.EGYPT &&
        travelersNativeCountryName === NativeCountryName.USA
      ) {
        return 3;
      } else if (
        destinationCountryName === DestinationCountryName.TURKEY &&
        travelersNativeCountryName === NativeCountryName.SPAIN
      ) {
        return 1;
      } else {
        return 0;
      }
    }
  );

  const mockGetTotalTravelersByAgeRange = jest.fn(
    async (
      destinationCountryName: DestinationCountryName,
      date: Date,
      travelersAgeRange: AgeRange
    ): Promise<number> => {
      if (
        destinationCountryName === DestinationCountryName.FRANCE &&
        travelersAgeRange.minAge == 18 &&
        travelersAgeRange.maxAge === 34
      ) {
        return 3;
      } else if (
        destinationCountryName === DestinationCountryName.FRANCE &&
        travelersAgeRange.minAge == 35 &&
        travelersAgeRange.maxAge === 50
      ) {
        return 1;
      } else if (
        destinationCountryName === DestinationCountryName.EGYPT &&
        travelersAgeRange.minAge == 51 &&
        travelersAgeRange.maxAge === 75
      ) {
        return 3;
      } else if (
        destinationCountryName === DestinationCountryName.TURKEY &&
        travelersAgeRange.minAge == 76 &&
        travelersAgeRange.maxAge === 100
      ) {
        return 1;
      } else {
        return 0;
      }
    }
  );

  const mockGetTotalTravelersByGender = jest.fn(
    async (
      destinationCountryName: DestinationCountryName,
      date: Date,
      travelersGender: Gender
    ): Promise<number> => {
      if (
        destinationCountryName === DestinationCountryName.FRANCE &&
        travelersGender === Gender.MALE
      ) {
        return 3;
      } else if (
        destinationCountryName === DestinationCountryName.FRANCE &&
        travelersGender === Gender.FEMALE
      ) {
        return 1;
      } else if (
        destinationCountryName === DestinationCountryName.EGYPT &&
        travelersGender === Gender.MALE
      ) {
        return 3;
      } else if (
        destinationCountryName === DestinationCountryName.EGYPT &&
        travelersGender === Gender.FEMALE
      ) {
        return 0;
      } else if (
        destinationCountryName === DestinationCountryName.TURKEY &&
        travelersGender === Gender.FEMALE
      ) {
        return 1;
      } else if (
        destinationCountryName === DestinationCountryName.TURKEY &&
        travelersGender === Gender.FEMALE
      ) {
        return 0;
      }
    }
  );

  const travelRepository: TravelRepository = {
    getDestinationCountries: mockGetDestinationCountries,
    getTotalTravelers: mockGetTotalTravelers,
    getTotalTravelersByNationality: mockGetTotalTravelersByNationality,
    getTotalTravelersByAgeRange: mockGetTotalTravelersByAgeRange,
    getTotalTravelersByGender: mockGetTotalTravelersByGender,
  };

  jest.mock(
    "./../../infrastructure/persistance/memory/InMemoryTravelRepository",
    () => {
      return {
        InMemoryTravelRepository: jest.fn().mockImplementation(() => {
          return travelRepository;
        }),
      };
    }
  );
}
mockTravelRepository();

function getTravelInteractor(): TravelBoundary {
  mockTravelRepository();
  const {
    InMemoryTravelRepository,
  } = require("./../../infrastructure/persistance/memory/InMemoryTravelRepository");
  const inMemoryTravelRepository: TravelRepository = new InMemoryTravelRepository();
  return new TravelInteractor(inMemoryTravelRepository);
}

describe("Travel use cases", () => {
  const date = "04-10-2020";
  const travelInteractor: TravelBoundary = getTravelInteractor();
  test("Countries total travelers", async (done) => {
    const countriesTotalTravelers: Map<
      DestinationCountryName,
      number
    > = await travelInteractor.getCountriesTotalTravelers(date);
    expect(countriesTotalTravelers.get(DestinationCountryName.FRANCE)).toBe(4);
    expect(countriesTotalTravelers.get(DestinationCountryName.EGYPT)).toBe(3);
    expect(countriesTotalTravelers.get(DestinationCountryName.TURKEY)).toBe(1);
    expect(countriesTotalTravelers.get(DestinationCountryName.JAPAN)).toBe(0);
    expect(countriesTotalTravelers.get(DestinationCountryName.RUSSIA)).toBe(0);
    done();
  });
  test("Countries total travelers by age range", async (done) => {
    const countriesTotalTravelersByAgeRange: Map<
      DestinationCountryName,
      Map<FixedAgeRanges, number>
    > = await travelInteractor.getCountriesTotalTravelersByAgeRange(date);
    expect(
      countriesTotalTravelersByAgeRange
        .get(DestinationCountryName.FRANCE)
        .get(FixedAgeRanges["18_34"])
    ).toBe(3);
    expect(
      countriesTotalTravelersByAgeRange
        .get(DestinationCountryName.FRANCE)
        .get(FixedAgeRanges["35_50"])
    ).toBe(1);
    expect(
      countriesTotalTravelersByAgeRange
        .get(DestinationCountryName.FRANCE)
        .get(FixedAgeRanges["51_75"])
    ).toBe(0);
    expect(
      countriesTotalTravelersByAgeRange
        .get(DestinationCountryName.FRANCE)
        .get(FixedAgeRanges["+75"])
    ).toBe(0);
    expect(
      countriesTotalTravelersByAgeRange
        .get(DestinationCountryName.EGYPT)
        .get(FixedAgeRanges["51_75"])
    ).toBe(3);
    expect(
      countriesTotalTravelersByAgeRange
        .get(DestinationCountryName.TURKEY)
        .get(FixedAgeRanges["+75"])
    ).toBe(1);
    done();
  });
  test("Countries total travelers by nationality", async (done) => {
    const countriesTotalTravelersByDestination: Map<
      DestinationCountryName,
      Map<NativeCountryName, number>
    > = await travelInteractor.getCountriesTotalTravelersByNationality(date);
    expect(
      countriesTotalTravelersByDestination
        .get(DestinationCountryName.FRANCE)
        .get(NativeCountryName.MOROCCO)
    ).toBe(2);
    expect(
      countriesTotalTravelersByDestination
        .get(DestinationCountryName.FRANCE)
        .get(NativeCountryName.CHINA)
    ).toBe(1);
    expect(
      countriesTotalTravelersByDestination
        .get(DestinationCountryName.FRANCE)
        .get(NativeCountryName.ITALY)
    ).toBe(1);
    expect(
      countriesTotalTravelersByDestination
        .get(DestinationCountryName.FRANCE)
        .get(NativeCountryName.SPAIN)
    ).toBe(0);
    expect(
      countriesTotalTravelersByDestination
        .get(DestinationCountryName.FRANCE)
        .get(NativeCountryName.USA)
    ).toBe(0);
    done();
  });
  test("Countries total travelers by gender", async (done) => {
    const countriesTotalTravelersByGender: Map<
      DestinationCountryName,
      Map<Gender, number>
    > = await travelInteractor.getCountriesTotalTravelersByGender(date);
    expect(
      countriesTotalTravelersByGender
        .get(DestinationCountryName.FRANCE)
        .get(Gender.MALE)
    ).toBe(3);
    expect(
      countriesTotalTravelersByGender
        .get(DestinationCountryName.FRANCE)
        .get(Gender.FEMALE)
    ).toBe(1);
    done();
  });
});

describe("Data validation", () => {
  const wrongDate = "something";
  const travelInteractor: TravelBoundary = getTravelInteractor();
  test("Countries total travelers", async (done) => {
    expect.assertions(1);
    try {
      await travelInteractor.getCountriesTotalTravelers(wrongDate);
    } catch (error) {
      expect(error.name).toBe("BAD_DATA");
      done();
    }
  });
  test("Countries total travelers by age range", async (done) => {
    expect.assertions(1);
    try {
      await travelInteractor.getCountriesTotalTravelersByAgeRange(wrongDate);
    } catch (error) {
      expect(error.name).toBe("BAD_DATA");
      done();
    }
  });
  test("Countries total travelers by nationality", async (done) => {
    const travelInteractor: TravelBoundary = await getTravelInteractor();
    expect.assertions(1);
    try {
      await travelInteractor.getCountriesTotalTravelersByNationality(wrongDate);
    } catch (error) {
      expect(error.name).toBe("BAD_DATA");
      done();
    }
  });
  test("Countries total travelers by gender", async (done) => {
    expect.assertions(1);
    try {
      await travelInteractor.getCountriesTotalTravelersByGender(wrongDate);
    } catch (error) {
      expect(error.name).toBe("BAD_DATA");
      done();
    }
  });
});
