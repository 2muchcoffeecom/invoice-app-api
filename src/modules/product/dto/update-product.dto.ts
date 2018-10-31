import { IsOptional } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto {
  @IsOptional()
  public name: string = undefined;

  @IsOptional()
  public price: number = undefined;

  constructor(protected input: any = {}, currentProduct?) {
    super(input, currentProduct);
    this.populateFields(input);
  }
}