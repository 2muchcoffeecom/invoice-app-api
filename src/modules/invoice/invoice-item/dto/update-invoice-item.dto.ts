import { IsOptional } from 'class-validator';
import { CreateInvoiceItemDto } from './create-invoice-item.dto';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateInvoiceItemDto extends CreateInvoiceItemDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  public product_id: string = undefined;

  @ApiModelPropertyOptional()
  @IsOptional()
  public quantity: number = undefined;

  constructor(protected input: any = {}, currentInvoiceItem?) {
    super(input, currentInvoiceItem);
    this.populateFields(input);
  }
}