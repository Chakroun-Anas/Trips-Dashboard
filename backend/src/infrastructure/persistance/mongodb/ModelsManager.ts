import { VError } from "verror";
import mongoose from "mongoose";
import chalk from "chalk";

export class ModelsManager {
  private static uniqueInstance: ModelsManager;
  private static models: any = {};
  private constructor() {}
  static async getInstance(dbURL: string) {
    if (ModelsManager.uniqueInstance) {
      return ModelsManager.uniqueInstance;
    } else {
      ModelsManager.configureMongoose();
      try {
        await ModelsManager.connectToDb(dbURL);
      } catch (error) {
        throw new VError(error, "Could not connect to MongoDB database");
      }
      const { TravelModel } = require("./models/travel");
      ModelsManager.models.travel = TravelModel;
      ModelsManager.uniqueInstance = new ModelsManager();
      return ModelsManager.uniqueInstance;
    }
  }
  private static configureMongoose() {
    mongoose.Promise = require("bluebird");
    mongoose.set("debug", true);
  }
  private static async connectToDb(dbURL: string) {
    try {
      console.log(chalk.green("Connecting to MongoDB database"));
      await mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(chalk.green("Connected successfully to MongoDB database"));
    } catch (error) {
      console.log(chalk.red("Could not connect to MongoDB database"));
      console.error(error);
      process.exit(1);
    }
  }
  getTravelModel() {
    return ModelsManager.models.travel;
  }
}
