import { IsOptional } from 'class-validator';
import { CreateInvoiceDto } from './create-invoice.dto';

export class UpdateInvoiceDto extends CreateInvoiceDto {
  @IsOptional()
  public customer_id: string = undefined;

  @IsOptional()
  public total: number = undefined;

  constructor(protected input: any = {}, currentInvoice?) {
    super(input, currentInvoice);
    this.populateFields(input);
  }
}