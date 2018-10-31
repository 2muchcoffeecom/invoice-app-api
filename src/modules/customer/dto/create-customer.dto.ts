import { IsNotEmpty, IsPhoneNumber, IsString, ValidationArguments } from 'class-validator';
import { CustomValidateFn } from 'validation-decorators';

import { CoreDto } from '../../shared/utils/dto/core.dto';
import { CustomerService } from '../customer.service';
import {app} from '../../../main';


export class CreateCustomerDto extends CoreDto {
  @IsNotEmpty()
  @IsPhoneNumber('')
  public phone: string = undefined;

  @CustomValidateFn('unique',
    (value: string, args: ValidationArguments, argsObject) => {
      const customerService = app.get(CustomerService);

      return customerService.findByName(value)
        .then((customer) => !customer)
        .catch(() => true);
    },
    {message: 'Customer Name already exists'},
  )
  @IsNotEmpty()
  @IsString()
  public name: string = undefined;

  @IsNotEmpty()
  @IsString()
  public address: string = undefined;

  constructor(protected input: any = {}, currentCustomer?) {
    super(currentCustomer);
    this.populateFields(input);
  }
}