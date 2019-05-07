import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { validateOrReject } from 'class-validator';

import { CreateProduct, Product, UpdateProduct } from './product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InvoiceItemService } from '../invoice/invoice-item/invoice-item.service';


@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly invoiceItemService: InvoiceItemService,
  ) {
  }

  async get(id?: string): Promise<Product | Product[]> {
    return id ? this.productModel.findById(id) : this.productModel.find();
  }

  async findByName(name: string): Promise<Product> {
    return this.productModel.findOne({name}).lean();
  }

  async create(product: CreateProduct): Promise<Product> {
    const productDto = new CreateProductDto(product);
    await validateOrReject(productDto);
    return this.productModel.create(productDto);
  }

  async update(query: UpdateProduct, product: UpdateProduct): Promise<Product> {
    const productDto = new UpdateProductDto(product);
    await validateOrReject(productDto);
    return this.productModel.findOneAndUpdate(
      query,
      product,
      {runValidators: true, new: true},
    );
  }

  async delete(id: string): Promise<Product> {
    const invoiceItems = await this.invoiceItemService.getByProductId(id);
    if (invoiceItems.length) {
      throw new HttpException('Product exsists in invoices', HttpStatus.BAD_REQUEST);
    }
    return this.productModel.findByIdAndDelete(id);
  }
}
