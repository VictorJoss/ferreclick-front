import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../admin-navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/products/product.service';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.css'
})
export class PostProductComponent implements OnInit {
  // variables para el formulario de productos
  categories: any[] = [];

  // creacion del formulario de productos
  productForm = signal<FormGroup>(
    new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      categories: new FormArray([], Validators.required) // Array de IDs seleccionados.
    })
  );

  // usamos productService para agregar productos y categoryService para obtener las categorías.
  constructor(
    private productService: ProductService,
    private categoryService:CategoryService,
    private router: Router
  ) {}

  // cargamos las categorías al iniciar el componente.
  ngOnInit() {
    this.loadCategories();
  }

  // obtenemos las categorías y las guardamos en la variable
  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al cargar las categorías', err);
      }
    });
  }

  // funciones para manejar las categorías seleccionadas.
  onCategoryChange(event: Event, categoryId: number) {
    const categoryFormArray = this.productForm().get('categories') as FormArray;
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      if (!categoryFormArray.value.includes(categoryId)) {
        categoryFormArray.push(new FormControl(categoryId));
      }
    } else {
      const index = categoryFormArray.value.indexOf(categoryId);
      if (index !== -1) {
        categoryFormArray.removeAt(index);
      }
    }
  }

  // Funcion para comprobar si una categoría está seleccionada.
  isCategorySelected(categoryId: number): boolean {
    const categoryFormArray = this.productForm().get('categories') as FormArray;
    return categoryFormArray.value.includes(categoryId);
  }

  // Función para comprobar si el formulario de categorías es invalido.
  isCategoryFormInvalid(): boolean {
    const categoryFormArray = this.productForm().get('categories') as FormArray;
    return categoryFormArray.length === 0;
  }

  // Función para agregar un producto.
  addProduct() {
    if (this.productForm().valid) {
      const formData = new FormData();
      const formValue = this.productForm().value;
  
      formData.append('name', formValue.name);
      formData.append('description', formValue.description);
      formData.append('price', formValue.price.toString()); 
  
      const categoriesArray = this.productForm().get('categories')?.value;
      formData.append('categoryIds', JSON.stringify(categoriesArray));
  
      const fileInput: HTMLInputElement | null = document.querySelector('#image');
      if (fileInput?.files?.length) {
        formData.append('image', fileInput.files[0]);
      }
  
      this.productService.addProduct(formData).subscribe({
        next: (res) => {
          alert('Producto agregado correctamente');
          this.router.navigateByUrl('/admin/products');
        },
        error: (err) => {
          alert('Error al agregar el producto');
          console.error(err);
        }
      });
    } else {
      this.productForm().markAllAsTouched();
    }
  }
}