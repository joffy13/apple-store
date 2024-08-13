import { OmitType } from "@nestjs/swagger";
import { Specification } from "../entities/specification.entity";
import { ProductSpecification } from "database/entities";

export class CreateSpecificationDto extends OmitType(ProductSpecification, ["id"]) { }
