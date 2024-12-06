import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from "../admin-navbar/navbar.component";
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

  // Se obtienen los productos y las categorias
  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  // Metodo para obtener los productos
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

  // Metodo para obtener las categorias
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

  // Metodo para filtrar productos por nombre y categoria
  filtrarProductos(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.textoBusqueda = input.value.toLowerCase();
    this.aplicarFiltros();
  }

  // Metodo para filtrar los productos por categoria
  filtrarPorCategoria(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.categoriaSeleccionada = select.value ? Number(select.value) : null;
    this.aplicarFiltros();
  }

  // Metodo para aplicar los filtros
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

  // Metodo para ir a la pagina de creacion de productos
  irACrearProducto():any{
    this.router.navigate(['/admin/products/create']);
  }

  // Metodo para ir a la pagina de edicion de productos
  irAEditarProducto(id:any):any{
    this.router.navigate(['/admin/products/edit', id]);
  }

  // Metodo para eliminar un producto
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
