import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nutriscore',
  templateUrl: './nutriscore.component.html',
  styleUrls: ['./nutriscore.component.css'],
})
export class NutriscoreComponent {
  @Input() grade = 'all';
}
