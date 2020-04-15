import { ModelsManager } from "./src/infrastructure/persistance/mongodb/ModelsManager";
import { DbTravelRepository } from "./src/infrastructure/persistance/mongodb/DbTravelRepository";
import { TravelBoundary } from "./src/usecase/boundaries/TravelBoundary";
import { TravelInteractor } from "./src/usecase/interactors/TravelInteractor";
import { TravelRepository } from "./src/usecase/repositories/TravelRepository";
import { InMemoryTravelRepository } from "./src/infrastructure/persistance/memory/InMemoryTravelRepository";
import { TravelController } from "./src/rest/controllers/TravelController";
import http from "http";
import chalk from "chalk";
import * as core from "express-serve-static-core";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import exposeServices from "./src/rest/routes";
import config from "./config";

function configureApplication(app: core.Express) {
  app.use(bodyParser.json({ limit: "1mb" }));
  app.use(cors());
}

function startHttpServer(app: core.Express) {
  http.createServer(app).listen(config.APP_PORT, function () {
    console.log(
      chalk.green("Web server is listening on port " + config.APP_PORT)
    );
    app.get("/isUp", (req, res) => {
      res.send("UP");
    });
  });
}

async function startApplication(app: core.Express) {
  async function getTravelController(): Promise<TravelController> {
    let travelRepository: TravelRepository;
    if (config.PERSISTANCE_TYPE === "MONGO_DB") {
      console.log(
        chalk.green(
          "Application will use MongoDB implementation of TravelRepository"
        )
      );
      const modelsManager: ModelsManager = await ModelsManager.getInstance(
        config.MongoDB_URL
      );
      await DbTravelRepository.populateTravelCollection(modelsManager);
      travelRepository = new DbTravelRepository(modelsManager);
    } else {
      travelRepository = new InMemoryTravelRepository();
      console.log(
        chalk.green(
          "Application will use InMemory implementation of TravelRepository"
        )
      );
    }
    const travelInteractor: TravelBoundary = new TravelInteractor(
      travelRepository
    );
    return new TravelController(travelInteractor);
  }
  console.log(chalk.green("Starting the application"));
  const travelController: TravelController = await getTravelController();
  exposeServices(app, {
    travelController: travelController,
  });
  console.log(chalk.green("Application is started"));
}

const app: core.Express = express();
configureApplication(app);
startApplication(app).then(() => startHttpServer(app));
