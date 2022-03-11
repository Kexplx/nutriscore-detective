import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ean13',
})
export class Ean13Pipe implements PipeTransform {
  transform(barcode: string): string {
    const a = barcode.slice(0, 1);
    const b = barcode.slice(1, 7);
    const c = barcode.slice(7, 13);

    return `${a}-${b}-${c}`;
  }
}
