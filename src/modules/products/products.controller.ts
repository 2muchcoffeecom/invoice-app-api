import { NextFunction, Request, Response } from 'express';

import {
  createProductInDb,
  deleteProductFromDb,
  getProductFromDb,
  getProductsFromDb,
  updateProductInDb,
} from './products.service';

export function getProducts(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  getProductsFromDb()
    .then(products => {
      res.json(products);
    })
    .catch(next);
}

export function createProduct(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const newProduct = req.body;

  createProductInDb(newProduct)
    .then(newProduct => {
      res.status(201).json(newProduct);
    })
    .catch(next);
}

export function getProduct(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const productId = req.params.id;

  getProductFromDb(productId)
    .then(product => {
      res.json(product);
    })
    .catch(next);
}

export function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const productId = req.params.id;
  const newFields = req.body;

  updateProductInDb(productId, newFields)
    .then(updatedProduct => {
      res.json(updatedProduct);
    })
    .catch(next);
}

export function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const productId = req.params.id;

  deleteProductFromDb(productId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
}
