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

  user:any;

  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.obtenerUsuario();
    
  }

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
