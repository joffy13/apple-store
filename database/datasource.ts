import * as entities from "./entities/index";
import * as migrations from "./migrations/index";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

config();

const configService = new ConfigService();

export const dataSourceOptions = (
  configService: ConfigService
): DataSourceOptions => {
  return {
    name: "postgres",
    type: "postgres",
    host: configService.get("POSTGRES_HOST"),
    port: configService.get("POSTGRES_PORT"),
    username: configService.get("POSTGRES_USER"),
    password: configService.get("POSTGRES_PASSWORD"),
    database: configService.get("POSTGRES_DB"),
    entities,
    synchronize: false,
    logging: false,
    migrations,
  };
};

const dataSource = new DataSource(dataSourceOptions(configService));
export default dataSource;
