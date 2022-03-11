import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './product/product';
import { ProductService } from './product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  commitIsoDate = environment.commitIsoDate;
  commitSha = environment.commitSha;
  detectiveClickCount = 0;

  step = 0;
  barcode = '';
  product?: Product;
  productNotFoundError?: Error;
  productIncompleteError?: Error;

  constructor(private productService: ProductService) {}

  onStartScanning() {
    this.onResetClick();
    this.step = 1;
  }

  onBarcodeDetect(barcode: string) {
    this.barcode = barcode;
    this.step++;
  }

  onCalculateNutriscoreClick() {
    this.step++;

    this.productService.getProductByBarcode(this.barcode).subscribe({
      next: product => {
        this.product = product;
        this.step++;
      },
      error: err => {
        switch (err) {
          case this.productService.errorTypes.productNotFoundError:
            // Image contained a barcode but the barcode
            // was not found in the OpenFoodFacts Database.
            this.productNotFoundError = err;
            break;
          case this.productService.errorTypes.productIncompleteError:
            // Image contained a barcode but the barcode
            // was not found in the OpenFoodFacts Database.
            this.productIncompleteError = err;
            break;
          default:
            // Stream failed but we don't know why.
            break;
        }

        this.step++;
      },
    });
  }

  onResetClick() {
    this.product = undefined;
    this.barcode = '';
    this.productNotFoundError = undefined;
    this.productIncompleteError = undefined;
    this.step = 0;
  }

  onDetectiveClicked() {
    this.detectiveClickCount = (this.detectiveClickCount % 3) + 1;
  }
}
