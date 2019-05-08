import { DocumentQuery } from 'mongoose';

import { IProduct } from './product.interface';
import Product from './product.model';

import { HttpError } from 'utils/error-hadler/http-error';

export function getProductsFromDb(): DocumentQuery<IProduct[], IProduct> {
  return Product.find({});
}

export function createProductInDb(newProduct: IProduct): Promise<IProduct> {
  const newEntity = new Product(newProduct);
  return newEntity.save();
}

export async function getProductFromDb(id: string): Promise<IProduct> {
  const product = await Product.findById(id);
  if (!product) {
    throw new HttpError('Product not found', 404);
  }
  return product;
}

export async function updateProductInDb(
  id: string,
  newFields: IProduct,
): Promise<IProduct> {
  const updatedEntity = await Product.findByIdAndUpdate(id, newFields, {
    new: true,
  });
  if (!updatedEntity) {
    throw new HttpError('Product not found', 404);
  }
  return updatedEntity;
}

export async function deleteProductFromDb(id: string): Promise<IProduct> {
  const deletedEntity = await Product.findByIdAndRemove(id);
  if (!deletedEntity) {
    throw new HttpError('Product not found', 404);
  }
  return deletedEntity;
}
