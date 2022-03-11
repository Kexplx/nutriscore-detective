import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import Quagga from '@ericblade/quagga2';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css'],
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
  @Output() detect = new EventEmitter<string>();

  barcodeCountMap: Map<string, number> = new Map();

  isScanning = false;

  emitTimeout?: ReturnType<typeof setTimeout>;

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
        numOfWorkers: navigator.hardwareConcurrency,
      },
      () => {
        this.isScanning = true;
        Quagga.start();
      },
    );

    Quagga.onDetected(result => {
      const barcode = result.codeResult.code;
      if (!barcode) {
        return;
      }

      let barcodeCount = this.barcodeCountMap.get(barcode) || 0;
      barcodeCount++;

      this.barcodeCountMap.set(barcode, barcodeCount);

      if (!this.emitTimeout) {
        this.emitTimeout = setTimeout(() => {
          const [barcodeWithHighestCount] = Array.from(this.barcodeCountMap.entries()).reduce(
            (acc, curr) => (curr[1] > acc[1] ? curr : acc),
          );

          this.detect.emit(barcodeWithHighestCount);
        }, 1000);
      }
    });
  }

  ngOnDestroy(): void {
    Quagga.stop();
  }
}
