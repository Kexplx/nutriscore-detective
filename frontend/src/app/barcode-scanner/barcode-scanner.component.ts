import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import Quagga from '@ericblade/quagga2';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css'],
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
  @Output() detect = new EventEmitter<string>();

  distinctBarcodes: string[] = [];
  isScanning = false;
  showInvalidBarcodeError = false;

  showInvalidBarcodeErrorDelaySub?: Subscription;

  ngOnInit(): void {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: document.querySelector('#stream')!,
          constraints: {
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: ['ean_reader'],
        },
      },
      () => {
        this.isScanning = true;
        Quagga.start();
      },
    );

    Quagga.onDetected(result => {
      // If our parent hasn't found a product for 3 sec after we
      // sent them the first barcode, we can be pretty sure that
      // the product with the barcode does not exist in the db
      // and inform the user that scanning the same product
      // any further would be pointless.
      if (!this.showInvalidBarcodeErrorDelaySub) {
        this.showInvalidBarcodeErrorDelaySub = timer(3000).subscribe(
          () => (this.showInvalidBarcodeError = true),
        );
      }

      const barcode = result.codeResult.code;
      if (!barcode) {
        return;
      }

      const isOld = this.distinctBarcodes.includes(barcode);
      if (isOld) {
        return;
      }

      this.distinctBarcodes.push(barcode);
      this.detect.emit(barcode);
    });
  }

  ngOnDestroy(): void {
    Quagga.stop();
  }
}
