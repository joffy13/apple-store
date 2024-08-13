import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllResultType } from 'src/lib/types/all-result.type';
import { Product } from 'database/entities';
import { RolesGuard } from 'src/lib/guards/role.guard';
import { UserRoles } from 'src/lib/decorators/user-roles.decorator';
import { UserRoleEnum } from 'src/lib/enums/user-role.enum';
import { JwtAuthGuard } from 'src/lib/guards/jwt-auth.guard';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  @ApiCreatedResponse({
    type: AllResultType<Product>,
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiFoundResponse({
    type: AllResultType<Product[]>
  })
  @Get()
  findAll() {
    return this.productService.findAll();
  }


  @ApiFoundResponse({
    type: AllResultType<Product[]>
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  @ApiCreatedResponse({
    type: AllResultType<Product>,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  @ApiCreatedResponse({
    type: AllResultType<Product>,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
