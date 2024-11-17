import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../admin/service/admin.service';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-product-dropdown',
  standalone: true,
  templateUrl: './product-dropdown.component.html',
  imports: [CommonModule],
  styleUrls: ['./product-dropdown.component.css'],
})
export class ProductDropdownComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() img: string = '';
  @Input() categoryId: number = 0;

  products: Product[] = [];
  itemsToShow: number = 8;
  increment: number = 4;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    if (this.categoryId) {
      this.loadProductsByCategory();
    }
  }

  loadProductsByCategory() {
    this.adminService.getProductsByCategory(this.categoryId).subscribe((products) => {
      this.products = products;
    });
  }

  viewDetails(productId: number) {
    this.router.navigate(['/customer/dashboard/product-details', productId]);
  }

  displayedProducts() {
    return this.products.slice(0, this.itemsToShow);
  }

  showLoadMoreButton() {
    return this.products.length > this.itemsToShow;
  }

  loadMore() {
    this.itemsToShow += this.increment;
  }

  handleKeyDown(event: KeyboardEvent, productId: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.viewDetails(productId);
    }
  }
}
