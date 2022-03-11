import { Product } from './product';
import { ProductRaw } from './product-raw';

export class ProductFactory {
  static fromRaw(productRaw: ProductRaw): Product {
    // Transforms '500mg' to '500 mg'
    const formatQuantity = (quantity: string) => {
      if (!quantity) {
        return undefined;
      }

      const pattern = /(\d?[\.,]?\d+) ?(\w+)/;
      const groups = pattern.exec(quantity);

      return `${groups![1]} ${groups![2]}`;
    };

    const product: Product = {
      barcode: productRaw.code,
      name: productRaw.product.product_name,
      nutriscoreGrade: productRaw.product.nutriscore_grade,
      brand: productRaw.product.brands.split(',')[0],
      quantity: formatQuantity(productRaw.product.quantity),
    };

    return product;
  }

  static createDummy(): Product {
    const product: Product = {
      barcode: '1234567890',
      name: 'Reis',
      nutriscoreGrade: 'a',
      brand: 'Oscars Rice Plant',
      quantity: '500 ml',
    };

    return product;
  }
}
