import { Component, Input } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-general-product-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './general-product-dropdown.component.html',
  styleUrl: './general-product-dropdown.component.css'
})
export class GeneralProductDropdownComponent {
  @Input() titulo: string = '';
  @Input() img: string = '';
  @Input() categoryId: number = 0;

  products: Product[] = [];
  itemsToShow: number = 8;
  increment: number = 4;

  constructor(private productService:ProductService, private router: Router) {}

  ngOnInit() {
    if (this.categoryId) {
      this.loadProductsByCategory();
    }
  }

  loadProductsByCategory() {
    this.productService.getProductsByCategory(this.categoryId).subscribe((products) => {
      this.products = products;
    });
  }

  viewDetails(productId: number) {
    this.router.navigate(['/general/dashboard/product-details', productId]);
  }

  displayedProducts() {
    return this.products.slice(0, this.itemsToShow);
  }

  showLoadMoreButton() {
    return this.products.length > this.itemsToShow;
  }

  loadMore() {
    this.router.navigate(['/general/allproducts'])
  }

  handleKeyDown(event: KeyboardEvent, productId: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.viewDetails(productId);
    }
  }
}
