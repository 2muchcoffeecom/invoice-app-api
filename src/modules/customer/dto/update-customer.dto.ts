import { IsOptional } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends CreateCustomerDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  public phone: string = undefined;

  @ApiModelPropertyOptional()
  @IsOptional()
  public name: string = undefined;

  @ApiModelPropertyOptional()
  @IsOptional()
  public address: string = undefined;

  constructor(protected input: any = {}, currentCustomer?) {
    super(input, currentCustomer);
    this.populateFields(input);
  }
}