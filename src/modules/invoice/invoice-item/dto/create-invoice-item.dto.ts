import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, ValidationArguments } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { CoreDto } from '../../../shared/utils/dto/core.dto';
import { CustomValidateFn } from '../../../shared/decorators/validations.decorator';
import { app } from '../../../../main';
import { InvoiceService } from '../../invoice.service';
import { ProductService } from '../../../product/product.service';


export class CreateInvoiceItemDto extends CoreDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsMongoId()
  @CustomValidateFn('exists',
    (value: string, args: ValidationArguments, argsObject) => {
      const invoiceService = app.get(InvoiceService);

      return invoiceService.get(value)
        .then((invoice) => !!invoice)
        .catch(() => false);
    },
    {message: 'Invoice not exists'},
  )
  public invoice_id: string = undefined;

  @ApiModelProperty({type: String, required: true})
  @IsNotEmpty()
  @IsMongoId()
  @CustomValidateFn('exists',
    (value: string, args: ValidationArguments, argsObject) => {
      const productService = app.get(ProductService);

      return productService.get(value)
        .then((product) => !!product)
        .catch(() => false);
    },
    {message: 'Product not exists'},
  )
  public product_id: string = undefined;

  @ApiModelProperty({type: Number, required: true})
  @IsNotEmpty()
  @IsNumber()
  public quantity: number = undefined;

  constructor(protected input: any = {}, currentInvoiceItem?) {
    super(currentInvoiceItem);
    this.populateFields(input);
  }
}