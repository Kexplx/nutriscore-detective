export interface Product {
  name: string;
  barcode: string;
  nutriscoreGrade: 'a' | 'b' | 'c' | 'd' | 'e';
  brand: string;
  quantity?: string;
}
