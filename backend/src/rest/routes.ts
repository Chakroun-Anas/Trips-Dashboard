import * as core from "express-serve-static-core";
import { Request, Response } from "express";
import { Controllers } from "./controllers/index";
import { TravelController } from "./controllers/TravelController";
export default function exposeServices(
  app: core.Express,
  { travelController }: Controllers
) {
  exposeTravelServices(app, travelController);
}

function exposeTravelServices(
  app: core.Express,
  travelController: TravelController
) {
  app.get("/travels/:date", (req: Request, res: Response) =>
    travelController.getCountriesTotalTravelers(req, res)
  );
  app.get("/travels/:date/ageRanges/", (req: Request, res: Response) =>
    travelController.getCountriesTotalTravelersByAgeRange(req, res)
  );
  app.get("/travels/:date/nationalities/", (req: Request, res: Response) =>
    travelController.getCountriesTotalTravelersByNationality(req, res)
  );
  app.get("/travels/:date/genders/", (req: Request, res: Response) =>
    travelController.getCountriesTotalTravelersByGender(req, res)
  );
}
