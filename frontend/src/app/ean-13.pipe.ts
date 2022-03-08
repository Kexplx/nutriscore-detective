import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ean13',
})
export class Ean13Pipe implements PipeTransform {
  transform(barcode: number): string {
    const codeAsString = barcode.toString();

    const a = codeAsString.slice(0, 1);
    const b = codeAsString.slice(1, 7);
    const c = codeAsString.slice(7, 13);

    return `${a}-${b}-${c}`;
  }
}
