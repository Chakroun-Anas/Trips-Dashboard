import { BaseInteractor, DataValidation } from "./BaseInteractor";
import {
  DestinationCountryName,
  NativeCountryName,
  Gender,
  FixedAgeRanges,
  DestinationCountry,
} from "../../domain/entities";
import { TravelBoundary } from "../boundaries";
import { TravelRepository } from "../repositories";

export class TravelInteractor extends BaseInteractor implements TravelBoundary {
  travelerRepository: TravelRepository;
  constructor(travelerRepository: TravelRepository) {
    super();
    this.travelerRepository = travelerRepository;
  }
  async getCountriesTotalTravelers(
    date: string
  ): Promise<Map<DestinationCountryName, number>> {
    const data: Map<
      string,
      { value: any; isValid: Function; errorMsg: string }
    > = new Map();
    data.set("date", this.dateValidation(date));
    this.validateData(data);
    const parsedDate: number = Date.parse(date);
    const destinationCountries: Array<DestinationCountry> = await this.travelerRepository.getDestinationCountries();
    const result: Map<DestinationCountryName, number> = new Map();
    for (const destinationCountry of destinationCountries) {
      const totalTravelers = await this.travelerRepository.getTotalTravelers(
        destinationCountry.name,
        new Date(parsedDate)
      );
      result.set(destinationCountry.name, totalTravelers);
    }
    return result;
  }
  async getCountriesTotalTravelersByAgeRange(
    date: string
  ): Promise<Map<DestinationCountryName, Map<FixedAgeRanges, number>>> {
    const result: Map<
      DestinationCountryName,
      Map<FixedAgeRanges, number>
    > = new Map();
    const data: Map<
      string,
      { value: any; isValid: Function; errorMsg: string }
    > = new Map();
    data.set("date", this.dateValidation(date));
    this.validateData(data);
    const parsedDate: number = Date.parse(date);
    const destinationCountries: Array<DestinationCountry> = await this.travelerRepository.getDestinationCountries();
    for (const destinationCountry of destinationCountries) {
      const totalByAgeRange: Map<FixedAgeRanges, number> = new Map();
      for (const ageRange of Object.keys(FixedAgeRanges)) {
        let minAge;
        let maxAge;
        if (ageRange.startsWith("+")) {
          minAge = 76;
          maxAge = 100;
        } else {
          minAge = parseInt(ageRange.split("_")[0]);
          maxAge = parseInt(ageRange.split("_")[1]);
        }

        const totalTravelers = await this.travelerRepository.getTotalTravelersByAgeRange(
          destinationCountry.name,
          new Date(parsedDate),
          {
            minAge,
            maxAge,
          }
        );
        totalByAgeRange.set(ageRange as FixedAgeRanges, totalTravelers);
      }
      result.set(destinationCountry.name, totalByAgeRange);
    }
    return result;
  }
  async getCountriesTotalTravelersByNationality(
    date: string
  ): Promise<Map<DestinationCountryName, Map<NativeCountryName, number>>> {
    const result: Map<
      DestinationCountryName,
      Map<NativeCountryName, number>
    > = new Map();
    const data: Map<
      string,
      { value: any; isValid: Function; errorMsg: string }
    > = new Map();
    data.set("date", this.dateValidation(date));
    this.validateData(data);
    const parsedDate: number = Date.parse(date);
    const destinationCountries: Array<DestinationCountry> = await this.travelerRepository.getDestinationCountries();
    for (const destinationCountry of destinationCountries) {
      const totalByNativeCountry: Map<NativeCountryName, number> = new Map();
      for (const nativeCountry of Object.keys(NativeCountryName)) {
        const totalTravelers = await this.travelerRepository.getTotalTravelersByNationality(
          destinationCountry.name,
          new Date(parsedDate),
          nativeCountry as NativeCountryName
        );
        totalByNativeCountry.set(
          nativeCountry as NativeCountryName,
          totalTravelers
        );
      }
      result.set(destinationCountry.name, totalByNativeCountry);
    }
    return result;
  }
  async getCountriesTotalTravelersByGender(
    date: string
  ): Promise<Map<DestinationCountryName, Map<Gender, number>>> {
    const result: Map<DestinationCountryName, Map<Gender, number>> = new Map();
    const data: Map<
      string,
      { value: any; isValid: Function; errorMsg: string }
    > = new Map();
    data.set("date", this.dateValidation(date));
    this.validateData(data);
    const parsedDate: number = Date.parse(date);
    const destinationCountries: Array<DestinationCountry> = await this.travelerRepository.getDestinationCountries();
    for (const destinationCountry of destinationCountries) {
      const totalByGender: Map<Gender, number> = new Map();
      for (const gender of Object.keys(Gender)) {
        const totalTravelers = await this.travelerRepository.getTotalTravelersByGender(
          destinationCountry.name,
          new Date(parsedDate),
          gender as Gender
        );
        totalByGender.set(gender as Gender, totalTravelers);
      }
      result.set(destinationCountry.name, totalByGender);
    }
    return result;
  }
  private dateValidation(date: any): DataValidation {
    return {
      value: date,
      isValid: (value: any) => {
        return typeof value === "string" && !isNaN(Date.parse(value));
      },
      errorMsg: "The indicated date is not valid",
    };
  }
}
