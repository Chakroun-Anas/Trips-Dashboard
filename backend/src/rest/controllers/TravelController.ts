import { NativeCountryName, Gender } from "./../../domain/entities/index";
import { Controller } from "./Controller";
import { RestError, domainErrorToRestError } from "./../errors";
import { Request, Response } from "express";
import { TravelBoundary } from "../../usecase/boundaries";
import { DestinationCountryName, FixedAgeRanges } from "../../domain/entities";
import mapToObj from "../../helpers/map-to-obj";

export class TravelController extends Controller {
  travelInteractor: TravelBoundary;
  constructor(travelInteractor: TravelBoundary) {
    super();
    this.travelInteractor = travelInteractor;
  }
  async getCountriesTotalTravelers(req: Request, res: Response) {
    const date: string = req.params.date;
    try {
      const countriesTotalTravelers: Map<
        DestinationCountryName,
        number
      > = await this.travelInteractor.getCountriesTotalTravelers(date);
      res.status(200).send(mapToObj(countriesTotalTravelers));
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getCountriesTotalTravelersByAgeRange(req: Request, res: Response) {
    const date: string = req.params.date;
    try {
      const countriesTotalTravelersByAgeRange: Map<
        DestinationCountryName,
        Map<FixedAgeRanges, number>
      > = await this.travelInteractor.getCountriesTotalTravelersByAgeRange(
        date
      );
      for (const key of countriesTotalTravelersByAgeRange.keys()) {
        countriesTotalTravelersByAgeRange.set(
          key,
          mapToObj(countriesTotalTravelersByAgeRange.get(key))
        );
      }
      res.status(200).send(mapToObj(countriesTotalTravelersByAgeRange));
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getCountriesTotalTravelersByNationality(req: Request, res: Response) {
    const date: string = req.params.date;
    try {
      const countriesTotalTravelersByNationality: Map<
        DestinationCountryName,
        Map<NativeCountryName, number>
      > = await this.travelInteractor.getCountriesTotalTravelersByNationality(
        date
      );
      for (const key of countriesTotalTravelersByNationality.keys()) {
        countriesTotalTravelersByNationality.set(
          key,
          mapToObj(countriesTotalTravelersByNationality.get(key))
        );
      }
      res.status(200).send(mapToObj(countriesTotalTravelersByNationality));
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getCountriesTotalTravelersByGender(req: Request, res: Response) {
    const date: string = req.params.date;
    try {
      const countriesTotalTravelersByGender: Map<
        DestinationCountryName,
        Map<Gender, number>
      > = await this.travelInteractor.getCountriesTotalTravelersByGender(date);
      for (const key of countriesTotalTravelersByGender.keys()) {
        countriesTotalTravelersByGender.set(
          key,
          mapToObj(countriesTotalTravelersByGender.get(key))
        );
      }
      res.status(200).send(mapToObj(countriesTotalTravelersByGender));
    } catch (error) {
      this.handleError(error, res);
    }
  }
}
