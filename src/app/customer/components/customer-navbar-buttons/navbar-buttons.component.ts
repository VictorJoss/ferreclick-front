import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { AuthService} from '../../../services/auth/auth.service';
import { CarritoService } from '../../../services/carrito/carrito.service';

@Component({
  selector: 'app-navbar-buttons',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-buttons.component.html',
  styleUrl: './navbar-buttons.component.css'
})
export class NavbarButtonsComponent {
  carrito:any = [];

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

  ngOnInit(): void{

    this.cargarCarrito();
    
  }
  
  logout(){
    UserStorageService.logout();
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.quantity * item.product.price, 0);
  }

  irACarritoDetails():void{
    this.router.navigate(['/customer/shoppingc-details']);
  }

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
          console.log(this.carrito);
        },
        error: (err) => {
          console.error('Error al obtener el carrito:', err);
        }
      });
    }
  }


}
