import { JsonDbRepository } from "./repositories";

export const ConfigContainer = {
  DatabasePath: "../db/jsonDatabase", // .json
};

export const ServiceContainer = {
  TreatmentRepository: new JsonDbRepository("treatment"),
  UserRepository: new JsonDbRepository("user")
};