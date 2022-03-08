export interface Product {
  name: string;
  barcode: number;
  nutriscoreGrade: 'a' | 'b' | 'c' | 'd' | 'e';
  brand: string;
  quantity?: string;
}
