import { IsOptional } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends CreateCustomerDto {
  @IsOptional()
  public phone: string = undefined;

  @IsOptional()
  public name: string = undefined;

  @IsOptional()
  public address: string = undefined;

  constructor(protected input: any = {}, currentCustomer?) {
    super(input, currentCustomer);
    this.populateFields(input);
  }
}