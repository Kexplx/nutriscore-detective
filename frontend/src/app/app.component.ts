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
  constructor(private productService: ProductService) {}

  onStartScanning() {
    this.onResetClick();
    this.step = 1;
  }

  onBarcodeDetect(barcode: string) {
    this.lookupBarcode(barcode);
  }

  private lookupBarcode(barcode: string) {
    this.productService.getProductByBarcode(barcode).subscribe({
      next: product => (this.product = product),
      error: err => {
        switch (err) {
          case this.productService.errorTypes.productNotFoundError:
            // Image contained a barcode but the barcode
            // was not found in the OpenFoodFacts Database.
            break;
          case this.productService.errorTypes.productIncompleteError:
            // Image contained a barcode, which existed in the Database but
            // the corresponding product was incomplete (e.g. nutriscore missing).
            break;
          default:
            // Stream failed but we don't know why.
            break;
        }
      },
    });
  }

  onResetClick() {
    this.product = undefined;
    this.barcode = '';
    this.step = 0;
  }

  onDetectiveClicked() {
    this.detectiveClickCount = (this.detectiveClickCount % 3) + 1;
  }
}
