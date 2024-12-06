import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../admin-navbar/navbar.component';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.css'
})
export class PostCategoryComponent {

  // Cargamos el category service para poder hacer uso de los métodos que nos permiten interactuar con la API de categorías. También cargamos el router para poder redirigir al usuario a la página de administración una vez que se haya creado la categoría.
  constructor(private fb: FormBuilder,
    private categoryService:CategoryService,
    private router: Router){};
  
  // Creamos un FormGroup que contendrá los campos necesarios para crear una categoría. En este caso, el nombre y la descripción de la categoría.
    categoryForm = signal<FormGroup>(
    new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    })
  )

  // Método que se ejecuta al hacer click en el botón de agregar categoría. Primero validamos que los campos del formulario sean válidos. Si lo son, llamamos al método addCategory del servicio de categorías, pasándole los valores del formulario. Si la respuesta de la API es correcta, redirigimos al usuario a la página de administración. En caso contrario, mostramos un mensaje de error.
  addCategory(){
    console.log('Agregando...');
    if(this.categoryForm().valid){
      this.categoryService.addCategory(this.categoryForm().value).subscribe((res)=>{
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
