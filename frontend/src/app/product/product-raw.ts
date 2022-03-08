import { ResponseStatus } from './response-status';

/**
 * Represents a product as we receive it from the external
 * {@link https://world.openfoodfacts.org OpenFoodFacts API}.
 */
export interface ProductRaw {
  code: string;
  status: ResponseStatus;
  product: {
    product_name: string;
    brands: string;
    nutriscore_grade: 'a' | 'b' | 'c' | 'd' | 'e';
    quantity: string;
  };
}
