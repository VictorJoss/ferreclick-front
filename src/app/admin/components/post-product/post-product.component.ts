import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { FormControl, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.css'
})
export class PostProductComponent implements OnInit {
  categories: any[] = [];

  productForm = signal<FormGroup>(
    new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      image: new FormControl("myhostedimage.com", [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      categories: new FormArray([], Validators.required) // Array de IDs seleccionados.
    })
  );

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.adminService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al cargar las categorías', err);
      }
    });
  }

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

  isCategorySelected(categoryId: number): boolean {
    const categoryFormArray = this.productForm().get('categories') as FormArray;
    return categoryFormArray.value.includes(categoryId);
  }

  isCategoryFormInvalid(): boolean {
    const categoryFormArray = this.productForm().get('categories') as FormArray;
    return categoryFormArray.length === 0;
  }

  addProduct() {
    if (this.productForm().valid) {
      const formData = {
        ...this.productForm().value,
        categoryIds: this.productForm().get('categories')?.value
      };
  
      delete formData.categories; 
  
      this.adminService.addProduct(formData).subscribe({
        next: (res) => {
          alert('Producto agregado correctamente');
          this.router.navigateByUrl('/admin/dashboard');
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