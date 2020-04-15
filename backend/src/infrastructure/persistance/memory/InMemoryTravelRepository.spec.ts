import { InMemoryTravelRepository } from "./InMemoryTravelRepository";
import { TravelRepository } from "./../../../usecase/repositories/TravelRepository";
import {
  Traveler,
  Gender,
  NativeCountryName,
  Travel,
  DestinationCountryName,
} from "../../../domain/entities";

function generateTravelers(): Array<Traveler> {
  return [
    {
      id: "1",
      gender: Gender.MALE,
      nativeCountry: NativeCountryName.MOROCCO,
      age: 36,
    },
    {
      id: "2",
      gender: Gender.FEMALE,
      nativeCountry: NativeCountryName.CHINA,
      age: 18,
    },
    {
      id: "3",
      gender: Gender.MALE,
      nativeCountry: NativeCountryName.ITALY,
      age: 75,
    },
    {
      id: "4",
      gender: Gender.FEMALE,
      nativeCountry: NativeCountryName.MOROCCO,
      age: 78,
    },
    {
      id: "5",
      gender: Gender.FEMALE,
      nativeCountry: NativeCountryName.MOROCCO,
      age: 90,
    },
  ];
}

function generateTravels(
  date: Date,
  travelers: Array<Traveler>
): Array<Travel> {
  return [
    {
      traveler: { ...travelers[0] },
      destinationCountry: { name: DestinationCountryName.FRANCE },
      date,
    },
    {
      traveler: { ...travelers[1] },
      destinationCountry: { name: DestinationCountryName.FRANCE },
      date,
    },
    {
      traveler: { ...travelers[4] },
      destinationCountry: { name: DestinationCountryName.FRANCE },
      date,
    },
    {
      traveler: { ...travelers[2] },
      destinationCountry: { name: DestinationCountryName.EGYPT },
      date,
    },
    {
      traveler: { ...travelers[3] },
      destinationCountry: { name: DestinationCountryName.TURKEY },
      date,
    },
  ];
}

function getInMemoryTravelRepository(date: Date): TravelRepository {
  return new InMemoryTravelRepository(
    generateTravels(date, generateTravelers())
  );
}

describe("In Memory Travel Repository", () => {
  const date = new Date("04-10-2020");
  const repo = getInMemoryTravelRepository(date);
  test("Total of travelers ", async (done) => {
    expect(
      await repo.getTotalTravelers(DestinationCountryName.FRANCE, date)
    ).toBe(3);
    expect(
      await repo.getTotalTravelers(DestinationCountryName.EGYPT, date)
    ).toBe(1);
    expect(
      await repo.getTotalTravelers(DestinationCountryName.TURKEY, date)
    ).toBe(1);
    expect(
      await repo.getTotalTravelers(DestinationCountryName.JAPAN, date)
    ).toBe(0);
    expect(
      await repo.getTotalTravelers(DestinationCountryName.RUSSIA, date)
    ).toBe(0);
    done();
  });
  test("Total of travelers by nationality", async (done) => {
    expect(
      await repo.getTotalTravelersByNationality(
        DestinationCountryName.FRANCE,
        date,
        NativeCountryName.MOROCCO
      )
    ).toBe(2);
    expect(
      await repo.getTotalTravelersByNationality(
        DestinationCountryName.FRANCE,
        date,
        NativeCountryName.CHINA
      )
    ).toBe(1);
    expect(
      await repo.getTotalTravelersByNationality(
        DestinationCountryName.FRANCE,
        date,
        NativeCountryName.ITALY
      )
    ).toBe(0);
    done();
  });
  test("Total of travelers by age range", async (done) => {
    expect(
      await repo.getTotalTravelersByAgeRange(
        DestinationCountryName.FRANCE,
        date,
        {
          minAge: 18,
          maxAge: 50,
        }
      )
    ).toBe(2);
    expect(
      await repo.getTotalTravelersByAgeRange(
        DestinationCountryName.EGYPT,
        date,
        {
          minAge: 10,
          maxAge: 20,
        }
      )
    ).toBe(0);
    done();
  });
  test("Total of travelers by gender", async (done) => {
    expect(
      await repo.getTotalTravelersByGender(
        DestinationCountryName.FRANCE,
        date,
        Gender.MALE
      )
    ).toBe(1);
    expect(
      await repo.getTotalTravelersByGender(
        DestinationCountryName.FRANCE,
        date,
        Gender.FEMALE
      )
    ).toBe(2);
    done();
  });
});
