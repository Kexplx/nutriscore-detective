import { Component, Input } from '@angular/core';
import { map, timer } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  @Input() text = 'Loading';

  // Braille tokens.
  private chars = ['⠙', '⠘', '⠰', '⠴', '⠤', '⠦', '⠆', '⠃', '⠋', '⠉'];

  char$ = timer(0, 100).pipe(map(i => this.chars[(i + 1) % 10]));
}
