import { OmitType } from "@nestjs/swagger";
import { Product, ProductSpecification } from "database/entities";

export class CreateSpecificationsDto extends OmitType(ProductSpecification, ['id'] as const) {}

export class CreateProductDto extends OmitType(Product, ['id'] as const) {
  specification: CreateSpecificationsDto;
}