import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { AuthService} from '../../../services/auth/auth.service';
import { CarritoService } from '../../../services/carrito/carrito.service';

@Component({
  selector: 'app-navbar-buttons',
  standalone: true,
  imports: [],
  templateUrl: './navbar-buttons.component.html',
  styleUrl: './navbar-buttons.component.css'
})
export class NavbarButtonsComponent {

  // Variable para almacenar el carrito
  carrito:any = [];

  // CartItems DTO
  // "cartItems": [
  //   {
  //       "id": 1,
  //       "product": {
  //           "name": "Martillo",
  //           "description": "Herramienta para clavar o desmontar clavos.",
  //           "image": "https://soelco.co/wp-content/uploads/MAC-29F.webp",
  //           "price": 45000.0,
  //           "producId": 1
  //       },
  //       "quantity": 20
  //   }
  //  ]

  constructor(
    private router: Router,
    private authService: AuthService,
    private carritoService:CarritoService
  ){}

  // se carga el carrito al iniciar el componente
  ngOnInit(): void{

    this.cargarCarrito();
    
  }
  
  // metodo para cerrar sesion
  logout(){
    UserStorageService.logout();
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  // metodo para calcular el total del carrito
  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.quantity * item.product.price, 0);
  }

  // metodo para redirigir a la pagina de detalles del carrito
  irACarritoDetails():void{
    this.router.navigate(['/customer/shoppingc-details']);
  }

  // metodo para redirigir a la pagina de detalles del usuario
  irAUserDetails():void{
    this.router.navigate(['/customer/user-details']);
  }

  // metodo para cargar el carrito
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


}
