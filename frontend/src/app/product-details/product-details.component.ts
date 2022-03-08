import { Component, Input } from '@angular/core';
import { ProductFactory } from '../product/product-factory';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  @Input() product = ProductFactory.createDummy();
}
