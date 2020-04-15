import { NativeCountryName } from "./../../domain/entities/index";
import {
  DestinationCountryName,
  Gender,
  FixedAgeRanges,
} from "../../domain/entities";

export interface TravelBoundary {
  getCountriesTotalTravelers(
    date: string
  ): Promise<Map<DestinationCountryName, number>>;
  getCountriesTotalTravelersByAgeRange(
    date: string
  ): Promise<Map<DestinationCountryName, Map<FixedAgeRanges, number>>>;
  getCountriesTotalTravelersByNationality(
    date: string
  ): Promise<Map<DestinationCountryName, Map<NativeCountryName, number>>>;
  getCountriesTotalTravelersByGender(
    date: string
  ): Promise<Map<DestinationCountryName, Map<Gender, number>>>;
}
