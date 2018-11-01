import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, ValidationArguments } from 'class-validator';

import { CoreDto } from '../../shared/utils/dto/core.dto';
import { CustomValidateFn } from 'validation-decorators';
import { app } from '../../../main';
import { CustomerService } from '../../customer/customer.service';


export class CreateInvoiceDto extends CoreDto {
  @CustomValidateFn('exists',
    (value: string, args: ValidationArguments, argsObject) => {
      const customerService = app.get(CustomerService);
      
      return customerService.get(value)
        .then((customer) => customer)
        .catch(() => false);
    },
    {message: 'Customer not exists'},
  )
  @IsNotEmpty()
  @IsMongoId()
  public customer_id: string = undefined;
  
  @IsOptional()
  @IsNumber()
  public discount: number = undefined;
  
  @IsNotEmpty()
  @IsNumber()
  public total: number = undefined;
  
  constructor(protected input: any = {}, currentInvoice?) {
    super(currentInvoice);
    this.populateFields(input);
  }
}