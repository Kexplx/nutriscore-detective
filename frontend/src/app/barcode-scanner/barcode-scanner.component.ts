import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import Quagga from '@ericblade/quagga2';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css'],
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
  @Output() detected = new EventEmitter<string>();

  barcodeCountMap: Map<number, number> = new Map();

  barcodeSubject = new Subject<string>();
  barcodeSubjectSub?: Subscription;

  distinctBarcodes: string[] = [];

  isScanning = false;

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

        /**
         * Quagga is often too quick when scanning a barcode which may result in an invalid code being emitted.
         * The barcode detection normally looks like this (0 = an invalid barcode, 1 = a valid barcode):
         *    Quagga.start() -> 00011111111111111111111111
         * So the callback we pass to Quagga's `onDetected` method will be called with a
         * few invalid codes at first, followed by a long stream of the same valid barcode.
         * With this pipe we only emit if no new code was detected for 500 ms
         * thus avoiding to send any invalid barcodes to our parent.
         */
        this.barcodeSubjectSub = this.barcodeSubject.pipe(debounceTime(500)).subscribe(barcode => {
          this.detected.emit(barcode);
          Quagga.stop();
        });
      },
    );

    Quagga.onDetected(result => {
      const barcode = result.codeResult.code;

      if (!barcode) {
        return;
      }

      const isOldBarcode = this.distinctBarcodes.includes(barcode);
      if (isOldBarcode) {
        return;
      }

      this.distinctBarcodes.push(barcode);
      this.barcodeSubject.next(barcode);
    });
  }

  ngOnDestroy(): void {
    Quagga.stop();
    this.barcodeSubjectSub?.unsubscribe();
  }
}
