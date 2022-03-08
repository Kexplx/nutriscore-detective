import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import Quagga from '@ericblade/quagga2';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css'],
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
  @Output() detected = new EventEmitter<number>();

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
      },
    );

    Quagga.onDetected(result => {
      this.detected.emit(Number(result.codeResult.code));
      Quagga.stop();
    });
  }

  ngOnDestroy(): void {
    Quagga.stop();
  }
}
