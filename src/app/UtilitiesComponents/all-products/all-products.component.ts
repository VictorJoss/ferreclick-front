import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { GeneralNavbarComponent } from "../../general/components/general-navbar/general-navbar.component";
import { NavbarComponent } from "../../customer/components/customer-navbar/navbar.component";
import { ProductService } from '../../services/products/product.service';
import { response } from 'express';
import { error } from 'console';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [GeneralNavbarComponent, NavbarComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit{

  products: any[];
  categories: any[];
  filteredProducts: any[];
  searchTerm: string = '';
  selectedCategories: Set<number> = new Set(); // Conjunto de categorías seleccionadas

  constructor(private productService:ProductService, private router:Router, private categoryService:CategoryService){}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }


  cargarProductos(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.filteredProducts = [...this.products]; // Inicialmente, mostrar todos los productos
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  cargarCategorias():void {
    this.categoryService.getCategories().subscribe({
      next: (response) =>{
        this.categories = response;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  onSearch(event:Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    this.applyFilters();
  }

  onCategoryToggle(categoryId: number, event:Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.selectedCategories.add(categoryId);
    } else {
      this.selectedCategories.delete(categoryId);
    }
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesSearchTerm =
        product.name.toLowerCase().includes(this.searchTerm) ||
        product.description.toLowerCase().includes(this.searchTerm);

      const matchesCategory =
        this.selectedCategories.size === 0 || // Si no hay categorías seleccionadas, mostrar todo
        Array.from(this.selectedCategories).some((categoryId) =>
          this.categories
            .find((category) => category.id === categoryId)
            ?.productIds.includes(product.id)
        );

      return matchesSearchTerm && matchesCategory;
    });
  }


  isGeneral():boolean{
    if(UserStorageService.isAdminLoggedIn() || UserStorageService.isCustomerLoggedIn()){
      return false;
    }
    return true;
  }

  cortarTexto(texto, limitePalabras):string {
    const palabras = texto.split(" "); // Divide el texto en palabras
    if (palabras.length <= limitePalabras) {
      return texto; // Si el texto tiene menos de 50 palabras, lo devuelve completo
    }
    return palabras.slice(0, limitePalabras).join(" ") + "..."; // Devuelve las primeras 50 palabras con "..."
  }

  irAGeneralProductDetails(id:any):void{
    this.router.navigate(['/general/dashboard/product-details', id]);
  }

  irACustomerProductDetails(id:any):void{
    this.router.navigate(['/customer/dashboard/product-details', id]);
  }
  

}
