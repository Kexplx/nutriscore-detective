import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'germanDate',
})
export class GermanDatePipe implements PipeTransform {
  transform(dateAsIsoString: string): string {
    const date = new Date(dateAsIsoString);

    return date.toLocaleString('de', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}
