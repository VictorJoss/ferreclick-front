import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProductService } from '../../../services/products/product.service';
import { CategoryService } from '../../../services/category/category.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})
export class AdminProductComponent implements OnInit{

  products: any[] = [];
  categories: any[] = [];
  productosFiltrados: any[] = [];
  categoriaSeleccionada: number | null = null;
  textoBusqueda: string = '';

  constructor(private productService:ProductService, private categoryService:CategoryService, private router:Router){}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.productosFiltrados = [...this.products]; // Inicialmente muestra todos
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    });
  }

  obtenerCategorias(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    });
  }

  filtrarProductos(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.textoBusqueda = input.value.toLowerCase();
    this.aplicarFiltros();
  }

  filtrarPorCategoria(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.categoriaSeleccionada = select.value ? Number(select.value) : null;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.productosFiltrados = this.products.filter((product) => {
      const coincideTexto = product.name.toLowerCase().includes(this.textoBusqueda);
      const coincideCategoria = !this.categoriaSeleccionada || 
                                this.categories.some(cat => 
                                  cat.id === this.categoriaSeleccionada && 
                                  cat.productIds.includes(product.id)
                                );
      return coincideTexto && coincideCategoria;
    });
  }

  mostrarValue(valor):void{
    console.log(valor);
  }

  irACrearProducto():any{
    this.router.navigate(['/admin/products/create']);
  }

  irAEditarProducto(id:any):any{
    this.router.navigate(['/admin/products/edit', id]);
  }

   deleteProduct(id: number): void {
    this.productService.deleteProductById(id).subscribe({
      next: (response) => {
        alert("Producto eliminado exitosamente");
        this.obtenerProductos();
      },
      error: (error) => {
        console.error('Error al eliminar producto', error);
      }
    });
  }
}
