import { v4 as uuid } from "uuid";
import {
  Travel,
  DestinationCountry,
  Traveler,
  NativeCountryName,
  Gender,
} from "../../../domain/entities";

export async function generateTravels(
  destinationCountries: Array<DestinationCountry>
): Promise<Array<Travel>> {
  const result: Array<Travel> = [];
  let currentDate = new Date("07-01-2020");
  const getRandomDestinationCountry = async (): Promise<DestinationCountry> => {
    return destinationCountries[
      Math.floor(Math.random() * destinationCountries.length)
    ];
  };
  const generateRandomTravelers = (totalTravelers: number): Array<Traveler> => {
    const result: Array<Traveler> = [];
    for (let index = 0; index < totalTravelers; index++) {
      const nativeCountry: NativeCountryName = generateRandomNativeCountry();
      const gender: Gender = generateRandomGender();
      const age: number = generateRandomAge(18, 100);
      result.push({
        id: uuid(),
        gender,
        nativeCountry,
        age,
      });
    }
    function generateRandomNativeCountry(): NativeCountryName {
      return NativeCountryName[
        Object.keys(NativeCountryName)[
          Math.floor(Object.keys(NativeCountryName).length * Math.random())
        ] as NativeCountryName
      ];
    }
    function generateRandomGender(): Gender {
      return Gender[
        Object.keys(Gender)[
          Math.floor(Object.keys(Gender).length * Math.random())
        ] as Gender
      ];
    }
    function generateRandomAge(minAge: number, maxAge: number): number {
      return Math.floor((maxAge - minAge) * Math.random() + minAge);
    }
    return result;
  };
  for (let index = 0; index < 30; index++) {
    const travelers: Array<Traveler> = generateRandomTravelers(1000);
    for (const traveler of travelers) {
      const destinationCountry: DestinationCountry = await getRandomDestinationCountry();
      result.push({
        traveler,
        destinationCountry,
        date: currentDate,
      });
    }
    currentDate = new Date(currentDate.getTime() + 24 * 3600 * 1000);
  }
  return result;
}
