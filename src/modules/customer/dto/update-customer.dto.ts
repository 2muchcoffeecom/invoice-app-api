import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends CreateCustomerDto {
  @IsOptional()
  @IsPhoneNumber('')
  public phone: string = undefined;

  @IsOptional()
  @IsString()
  public name: string = undefined;
  
  @IsOptional()
  @IsString()
  public address: string = undefined;

  constructor(protected input: any = {}, currentCustomer?) {
    super(input, currentCustomer);
    this.populateFields(input);
  }
}