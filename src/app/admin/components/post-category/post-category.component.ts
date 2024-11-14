import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.css'
})
export class PostCategoryComponent {

  constructor(private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router){};
  
    categoryForm = signal<FormGroup>(
    new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    })
  )

  addCategory(){
    console.log('Agregando...');
    if(this.categoryForm().valid){
      this.adminService.addCategory(this.categoryForm().value).subscribe((res)=>{
        console.log(res);
        if(res.id != null){
          alert('Categoría creada correctamente');
          this.router.navigateByUrl('/admin/dashboard');
        } else{
          alert('Error al crear categoría');
        }
      })
    } else{
      this.categoryForm().markAllAsTouched();
    }
  }

}
