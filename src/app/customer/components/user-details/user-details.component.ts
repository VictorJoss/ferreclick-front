import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../customer-navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { UserService } from '../../../services/user/user.service';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit{

  // variable para manejar el usuario
  user:any;

  constructor(private userService:UserService){}

  // se obtiene el usuario al iniciar el componente
  ngOnInit(): void {
    this.obtenerUsuario();
    
  }

  // metodo para obtener el usuario logueado en el sistema
  obtenerUsuario():void{
    this.userService.getUser(UserStorageService.getUserId()).subscribe({
      next: (response) =>{
        this.user = response;
      },
      error: (error) =>{
        console.error(error);
      }
    })
  }

}
