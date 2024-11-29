import { Component, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/products/product.service';
import { CategoryService } from '../../../services/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  categories: any[] = [];
  product:any;
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
    private productService: ProductService,
    private categoryService:CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id')
    this.loadCategories();
    this.getProduct(productId);
  }

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

  editProduct() {
    if (this.productForm().valid) {
      const formData = {
        ...this.productForm().value,
        categoryIds: this.productForm().get('categories')?.value
      };
      console.log(FormData);
  
      delete formData.categories; 
  
    //   this.productService.addProduct(formData).subscribe({
    //     next: (res) => {
    //       alert('Producto agregado correctamente');
    //       this.router.navigateByUrl('/admin/dashboard');
    //     },
    //     error: (err) => {
    //       alert('Error al agregar el producto');
    //       console.error(err);
    //     }
    //   });
    // } else {
    //   this.productForm().markAllAsTouched();
    }
  }

  getProduct(id: any): void {
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        this.product = response;
        console.log(this.product);
        this.productForm().patchValue({
          name: this.product.name,
          description: this.product.description,
          image: this.product.image,
          price: this.product.price,
        });
  
        // Actualizar categorías seleccionadas
        const categoryFormArray = this.productForm().get('categories') as FormArray;
        this.product.categoryIds.forEach((categoryId: number) => {
          categoryFormArray.push(new FormControl(categoryId));
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  
}
