import { Component, OnInit } from '@angular/core';
import { NavbarButtonsComponent } from '../../../navbar-buttons/navbar-buttons.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from "../../../navbar/navbar.component";
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { CarritoService } from '../../../services/carrito/carrito.service';

@Component({
  selector: 'app-carrito-details',
  standalone: true,
  imports: [NavbarButtonsComponent, FooterComponent, NavbarComponent],
  templateUrl: './carrito-details.component.html',
  styleUrl: './carrito-details.component.css'
})
export class CarritoDetailsComponent  implements OnInit{

  carrito:any = [];

  constructor(private carritoService:CarritoService){}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  incrementarCantidad(id:any): void {
    this.carrito.find(producto => producto.product.producId == id).quantity++;
    const quantity = this.carrito.find(producto => producto.product.producId == id).quantity;
    this.agregarAlCarrito(id, quantity);
  }

  decrementarCantidad(id:any): void {
    if (this.carrito.find(producto => producto.product.producId == id).quantity > 1) {
      this.carrito.find(producto => producto.product.producId == id).quantity--;
      const quantity = this.carrito.find(producto => producto.product.producId == id).quantity;
      this.agregarAlCarrito(id, quantity);
    }
  }

  cambiarCantidad(event: Event, id:any): void {
    const input = event.target as HTMLInputElement;
    const valor = parseInt(input.value, 10);

    // Validación para evitar valores negativos o no numéricos
    this.carrito.find(producto => producto.id == id).cantidad = isNaN(valor) || valor < 1 ? 1 : valor;
  }

  calcularTotal(precio:number, cantidad:number):number{
    return precio * cantidad;
  }

  // METODO PARA AGREGAR AL CARRITO
  agregarAlCarrito(productId:any, quantity:any):void{
    const carritoDto = {
      userId: UserStorageService.getUserId(),
      productId,
      quantity
    }

    this.carritoService.addCarrito(carritoDto).subscribe({
      next: (response) => {
      },
      error: (err) => {
        console.error("Error al agregar producto al carrito:", err);
      }
    });
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
        },
        error: (err) => {
          console.error('Error al obtener el carrito:', err);
        }
      });
    }
  }

  // METODO PARA OBTENER EL TOTAL DEL CARRITO
  precioTotalCarrito():number{
    let total:number = 0
    this.carrito.forEach(e => {
      const precioProducto = e.product.price;
      const productoCantidad = e.quantity;
      const totalProducto = precioProducto * productoCantidad;
      total = total + totalProducto;
    });

    return total;
  }

  // CALCULAR IVA
  totalIVA():number{
    return this.precioTotalCarrito() * 0.19;
  }

  // BORRAR ELEMENTO
  borrarItem(id: number): void {
    const userId = UserStorageService.getUserId();
    if (userId) {
      this.carritoService.removeCartByUserId(userId, id).subscribe({
        next: () => {
          // Filtra el carrito para eliminar el elemento borrado
          this.carrito = this.carrito.filter((item: any) => item.product.producId !== id);
        },
        error: (err) => {
          console.error('Error al borrar el producto del carrito:', err);
        }
      });
    }
  }
}
