import { IsOptional } from 'class-validator';
import { CreateInvoiceDto } from './create-invoice.dto';
import { ApiModelPropertyOptional } from '@nestjs/swagger';


export class UpdateInvoiceDto extends CreateInvoiceDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  public customer_id: string = undefined;

  @ApiModelPropertyOptional()
  @IsOptional()
  public total: number = undefined;

  constructor(protected input: any = {}, currentInvoice?) {
    super(input, currentInvoice);
    this.populateFields(input);
  }
}