import { Component, Input, input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';
import { AuthService} from '../services/auth/auth.service';
import { CarritoService } from '../services/carrito/carrito.service';
import { LoginComponent } from '../login/login.component';
import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-navbar-buttons',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-buttons.component.html',
  styleUrl: './navbar-buttons.component.css'
})
export class NavbarButtonsComponent {
  

  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
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
    private route: ActivatedRoute,
    private carritoService:CarritoService
  ){}

  ngOnInit(): void{

    this.router.events.subscribe(event =>{
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    })

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
        },
        error: (err) => {
          console.error('Error al obtener el carrito:', err);
        }
      });
    }
  }


}
