import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../../services/products/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  cantidad: number = 1; // Cantidad inicial

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe((product) => {
        this.product = product;
      });
    }
  }

  incrementarCantidad(): void {
    this.cantidad++;
  }

  decrementarCantidad(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  cambiarCantidad(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valor = parseInt(input.value, 10);

    // Validación para evitar valores negativos o no numéricos
    this.cantidad = isNaN(valor) || valor < 1 ? 1 : valor;
  }
}

