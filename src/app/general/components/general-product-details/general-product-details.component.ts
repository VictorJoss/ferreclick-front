import { Component, ViewChild } from '@angular/core';
import { PopupComponent } from "../../../UtilitiesComponents/popup/popup.component";
import { GeneralNavbarComponent } from "../general-navbar/general-navbar.component";
import { FooterComponent } from "../../../customer/components/footer/footer.component";
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/products/product.service';
import { CarritoService } from '../../../services/carrito/carrito.service';

@Component({
  selector: 'app-general-product-details',
  standalone: true,
  imports: [PopupComponent, GeneralNavbarComponent, FooterComponent],
  templateUrl: './general-product-details.component.html',
  styleUrl: './general-product-details.component.css'
})
export class GeneralProductDetailsComponent {
  product: any;
  cantidad: number = 1; // Cantidad inicial
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;

  constructor(private route: ActivatedRoute, private productService: ProductService, private carritoService:CarritoService) {}

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

  triggerPopup(): void {
    this.popupComponent.showTimedPopup('Crea una cuenta para agregar elementos al carrito.');
  }
}
