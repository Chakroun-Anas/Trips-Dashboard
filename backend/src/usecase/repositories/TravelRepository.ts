import {
  DestinationCountryName,
  NativeCountryName,
  AgeRange,
  Gender,
  DestinationCountry,
} from "../../domain/entities";

export interface TravelRepository {
  getDestinationCountries(): Promise<Array<DestinationCountry>>;
  getTotalTravelers(
    destinationCountry: DestinationCountryName,
    date: Date
  ): Promise<number>;
  getTotalTravelersByNationality(
    destinationCountryName: DestinationCountryName,
    date: Date,
    travelersNativeCountryName: NativeCountryName
  ): Promise<number>;
  getTotalTravelersByAgeRange(
    destinationCountryName: DestinationCountryName,
    date: Date,
    travelersAgeRange: AgeRange
  ): Promise<number>;
  getTotalTravelersByGender(
    destinationCountryName: DestinationCountryName,
    date: Date,
    travelersGender: Gender
  ): Promise<number>;
}
