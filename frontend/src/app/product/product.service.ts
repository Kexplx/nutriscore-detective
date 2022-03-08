import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product';
import { ProductFactory } from './product-factory';
import { ProductRaw } from './product-raw';
import { ResponseStatus } from './response-status';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  errorTypes = {
    productNotFoundError: new Error(),
    productIncompleteError: new Error(),
  };

  constructor(private http: HttpClient) {}

  getProductByBarcode(barcode: number): Observable<Product> {
    const url = `${environment.barcodeToProductApi}/${barcode}.json`;

    return this.http.get<ProductRaw>(url).pipe(
      map(productRaw => {
        if (productRaw.status === ResponseStatus.Failure) {
          throw this.errorTypes.productNotFoundError;
        }

        if (!this.isProductRawComplete(productRaw)) {
          throw this.errorTypes.productIncompleteError;
        }

        return ProductFactory.fromRaw(productRaw);
      }),
    );
  }

  private isProductRawComplete(productRaw: ProductRaw): boolean {
    if (
      productRaw.code &&
      productRaw.status &&
      productRaw.product.brands &&
      productRaw.product.nutriscore_grade &&
      productRaw.product.product_name &&
      productRaw.product.quantity
    ) {
      return true;
    }

    return false;
  }
}
