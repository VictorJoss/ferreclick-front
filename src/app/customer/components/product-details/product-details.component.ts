import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../customer-navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../../services/products/product.service';
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { CarritoService } from '../../../services/carrito/carrito.service';
import { PopupComponent } from '../../../UtilitiesComponents/popup/popup.component';

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
  carrito:any = [];
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;

  constructor(private route: ActivatedRoute, private productService: ProductService, private carritoService:CarritoService) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe((product) => {
        this.product = product;
      });
    }
    
    this.cargarCarrito();
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


  // METODO PARA AGREGAR AL CARRITO
  agregarAlCarrito():void{
    const carritoDto = {
      userId: UserStorageService.getUserId(),
      productId: this.product.id,
      quantity: this.cantidad
    }

    this.carritoService.addCarrito(carritoDto).subscribe({
      next: (response) => {
      },
      error: (err) => {
        console.error("Error al agregar producto al carrito:", err);
      }
    });

    location.reload();
  }


  // METODO PARA OBTENER EL CARRITO
  cargarCarrito():void{
    // Obtener el userId desde el UserStorageService
    const userId = UserStorageService.getUserId();
    if (userId) {
      // Llamar al servicio para obtener el carrito por ID de usuario
      this.carritoService.getCartByUserId(userId).subscribe({
        next: (carritoData) => {
          // Guardar los datos del carrito en la variable
          this.carrito = carritoData;
          this.carrito = this.carrito.cartItems;
          this.obtenerCantidad(this.product?.id)
        },
        error: (err) => {
          console.error('Error al obtener el carrito:', err);
        }
      });
    }
  }


  // Método para obtener la cantidad del producto
  obtenerCantidad(id: number): void {
    const producto = this.carrito.find(e => e.product.producId === id);
    if (producto) {
      this.cantidad = producto.quantity;  // Asigna la cantidad del producto encontrado
    } else {
      this.cantidad = 1;  // Si no se encuentra el producto, se establece a 1
    }
  }

  triggerPopup(): void {
    this.popupComponent.showTimedPopup('Crea una cuenta para agregar elementos al carrito.');
  }

}

