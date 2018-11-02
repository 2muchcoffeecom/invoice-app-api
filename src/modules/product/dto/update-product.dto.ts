import { IsOptional } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

import { CreateProductDto } from './create-product.dto';


export class UpdateProductDto extends CreateProductDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  public name: string = undefined;
  
  @ApiModelPropertyOptional()
  @IsOptional()
  public price: number = undefined;

  constructor(protected input: any = {}, currentProduct?) {
    super(input, currentProduct);
    this.populateFields(input);
  }
}