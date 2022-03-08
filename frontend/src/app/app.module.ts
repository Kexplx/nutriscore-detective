import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ErrorAlertComponent } from './error-alert/error-alert.component';
import { NutriscoreComponent } from './nutriscore/nutriscore.component';
import { Ean13Pipe } from './ean-13.pipe';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { GermanDatePipe } from './german-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    ProductDetailsComponent,
    ErrorAlertComponent,
    NutriscoreComponent,
    Ean13Pipe,
    BarcodeScannerComponent,
    GermanDatePipe,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
