import { Component } from '@angular/core';
import { ProductDropdownComponent } from '../product-dropdown/product-dropdown.component';

@Component({
  selector: 'app-productsection',
  standalone: true,
  imports: [ProductDropdownComponent],
  templateUrl: './productsection.component.html',
  styleUrl: './productsection.component.css'
})
export class ProductsectionComponent {

}
