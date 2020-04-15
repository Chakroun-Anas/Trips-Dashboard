import chalk from "chalk";
import { ModelsManager } from "./ModelsManager";
import { TravelRepository } from "./../../../usecase/repositories/TravelRepository";
import {
  DestinationCountry,
  DestinationCountryName,
  NativeCountryName,
  AgeRange,
  Gender,
  Travel,
} from "../../../domain/entities";
import { generateTravels } from "../generators/generateTravels";
export class DbTravelRepository implements TravelRepository {
  modelsManager: ModelsManager;
  constructor(modelsManager: ModelsManager) {
    this.modelsManager = modelsManager;
  }
  static async populateTravelCollection(modelsManager: ModelsManager) {
    const TravelModel = modelsManager.getTravelModel();
    const totalTravelsDocs: number = await TravelModel.countDocuments();
    if (totalTravelsDocs === 0) {
      console.log(chalk.green("Populating travel collection"));
      const destinationCountries: Array<DestinationCountry> = [];
      Object.keys(DestinationCountryName).forEach((destinationCountryName) => {
        destinationCountries.push({
          name:
            DestinationCountryName[
              destinationCountryName as DestinationCountryName
            ],
        });
      });
      const travels: Array<Travel> = await generateTravels(
        destinationCountries
      );
      for (const travel of travels) {
        const { destinationCountry, date } = travel;
        const { gender, nativeCountry, age } = travel.traveler;
        await TravelModel.create({
          traveler: {
            gender,
            nativeCountry,
            age,
          },
          destinationCountry: destinationCountry.name,
          date,
        });
      }
      console.log(chalk.green("Done populating travel collection"));
    } else {
      console.log(chalk.green("Travel collection already populated"));
    }
  }
  async getDestinationCountries(): Promise<DestinationCountry[]> {
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
    destinationCountry: DestinationCountryName,
    date: Date
  ): Promise<number> {
    const TravelModel = this.modelsManager.getTravelModel();
    const totalTravelers = await TravelModel.countDocuments({
      destinationCountry,
      date,
    });
    return totalTravelers;
  }
  async getTotalTravelersByNationality(
    destinationCountryName: DestinationCountryName,
    date: Date,
    travelersNativeCountryName: NativeCountryName
  ): Promise<number> {
    const TravelModel = this.modelsManager.getTravelModel();
    const totalTravelersByNationality = await TravelModel.countDocuments({
      destinationCountry: destinationCountryName,
      date,
      "traveler.nativeCountry": travelersNativeCountryName,
    });
    return totalTravelersByNationality;
  }
  async getTotalTravelersByAgeRange(
    destinationCountryName: DestinationCountryName,
    date: Date,
    { minAge, maxAge }: AgeRange
  ): Promise<number> {
    const TravelModel = this.modelsManager.getTravelModel();
    const totalTravelersByAgeRange = await TravelModel.countDocuments({
      destinationCountry: destinationCountryName,
      date,
      "traveler.age": { $lt: maxAge, $gt: minAge },
    });
    return totalTravelersByAgeRange;
  }
  async getTotalTravelersByGender(
    destinationCountryName: DestinationCountryName,
    date: Date,
    travelersGender: Gender
  ): Promise<number> {
    const TravelModel = this.modelsManager.getTravelModel();
    const totalTravelersByGender = await TravelModel.countDocuments({
      destinationCountry: destinationCountryName,
      date,
      "traveler.gender": travelersGender,
    });
    return totalTravelersByGender;
  }
}
