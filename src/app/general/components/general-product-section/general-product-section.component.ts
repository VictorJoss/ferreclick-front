import { Component } from '@angular/core';
import { GeneralProductDropdownComponent } from '../general-product-dropdown/general-product-dropdown.component';

@Component({
  selector: 'app-general-product-section',
  standalone: true,
  imports: [GeneralProductDropdownComponent],
  templateUrl: './general-product-section.component.html',
  styleUrl: './general-product-section.component.css'
})
export class GeneralProductSectionComponent {

}
