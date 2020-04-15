import {
  DestinationCountryName,
  NativeCountryName,
  AgeRange,
  Gender,
  Traveler,
  DestinationCountry,
  Travel,
} from "../../../domain/entities";
import { TravelRepository } from "../../../usecase/repositories/TravelRepository";
import { generateTravels } from "../generators/generateTravels";

export class InMemoryTravelRepository implements TravelRepository {
  travels: Array<Travel> = [];
  constructor(travels?: Array<Travel>) {
    if (travels) {
      this.travels = travels;
    } else {
      this.getDestinationCountries().then((destinationCountries) => {
        generateTravels(destinationCountries).then((travels) => {
          this.travels = travels;
        });
      });
    }
  }

  async getDestinationCountries(): Promise<Array<DestinationCountry>> {
    const result: Array<DestinationCountry> = [];
    Object.keys(DestinationCountryName).forEach((destinationCountryName) => {
      result.push({
        name:
          DestinationCountryName[
            destinationCountryName as DestinationCountryName
          ],
      });
    });
    return result;
  }
  async getTotalTravelers(
    destinationCountryName: DestinationCountryName,
    date: Date
  ): Promise<number> {
    return this.travels.filter((travel) => {
      return (
        travel.destinationCountry.name === destinationCountryName &&
        travel.date.getTime() === date.getTime()
      );
    }).length;
  }
  async getTotalTravelersByNationality(
    destinationCountryName: DestinationCountryName,
    date: Date,
    travelersNativeCountryName: NativeCountryName
  ): Promise<number> {
    return this.travels.filter((travel) => {
      return (
        travel.destinationCountry.name === destinationCountryName &&
        travel.traveler.nativeCountry === travelersNativeCountryName &&
        travel.date.getTime() === date.getTime()
      );
    }).length;
  }
  async getTotalTravelersByAgeRange(
    destinationCountryName: DestinationCountryName,
    date: Date,
    travelersAgeRange: AgeRange
  ): Promise<number> {
    return this.travels.filter((travel) => {
      return (
        travel.destinationCountry.name === destinationCountryName &&
        travel.traveler.age <= travelersAgeRange.maxAge &&
        travel.traveler.age >= travelersAgeRange.minAge &&
        travel.date.getTime() === date.getTime()
      );
    }).length;
  }
  async getTotalTravelersByGender(
    destinationCountryName: DestinationCountryName,
    date: Date,
    travelersGender: Gender
  ): Promise<number> {
    return this.travels.filter((travel) => {
      return (
        travel.destinationCountry.name === destinationCountryName &&
        travel.traveler.gender === travelersGender &&
        travel.date.getTime() === date.getTime()
      );
    }).length;
  }
}
