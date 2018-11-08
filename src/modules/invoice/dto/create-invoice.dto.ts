import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, ValidationArguments } from 'class-validator';

import { CoreDto } from '../../shared/utils/dto/core.dto';
import { CustomValidateFn } from '../../shared/decorators/validations.decorator';
import { app } from '../../../main';
import { CustomerService } from '../../customer/customer.service';


export class CreateInvoiceDto extends CoreDto {
  @ApiModelProperty()
  @CustomValidateFn('exists',
    (value: string, args: ValidationArguments, argsObject) => {
      const customerService = app.get(CustomerService);
      return customerService.get(value)
        .then((customer) => !!customer)
        .catch(() => false);
    },
    {message: 'Customer not exists'},
  )
  @IsNotEmpty()
  @IsMongoId()
  public customer_id: string = undefined;
  
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  public discount: number = undefined;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumber()
  public total: number = undefined;

  constructor(protected input: any = {}, currentInvoice?) {
    super(currentInvoice);
    this.populateFields(input);
  }
}