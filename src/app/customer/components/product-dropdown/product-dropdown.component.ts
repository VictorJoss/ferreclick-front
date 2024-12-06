import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/products/product.service';

/**
 * Interfaz que representa un producto.
 */
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

/**
 * Componente para mostrar un dropdown con productos.
 * Permite listar productos por categoría, mostrar detalles de un producto
 * y navegar a la página de todos los productos.
 */
@Component({
  selector: 'app-product-dropdown',
  standalone: true,
  templateUrl: './product-dropdown.component.html',
  imports: [CommonModule],
  styleUrls: ['./product-dropdown.component.css'],
})
export class ProductDropdownComponent implements OnInit {

    /**
   * Título del dropdown.
   */
  @Input() titulo: string = '';
    /**
   * URL de la imagen a mostrar en el encabezado del dropdown.
   */
  @Input() img: string = '';
    /**
   * ID de la categoría de productos a cargar.
   */
  @Input() categoryId: number = 0;

    /**
   * Lista de productos cargados de la categoría.
   */
  products: Product[] = [];
   /**
   * Cantidad de productos a mostrar inicialmente.
   */
  itemsToShow: number = 8;
    /**
   * Incremento de productos a mostrar al cargar más.
   */
  increment: number = 4;


    /**
   * Constructor del componente.
   * @param productService Servicio para obtener productos desde la API.
   * @param router Servicio para la navegación entre rutas.
   */
  constructor(private productService:ProductService, private router: Router) {}


    /**
   * Hook de inicialización del componente.
   * Carga los productos si se ha proporcionado un ID de categoría.
   */
  ngOnInit() {
    if (this.categoryId) {
      this.loadProductsByCategory();
    }
  }


    /**
   * Carga los productos correspondientes a la categoría proporcionada.
   */
  loadProductsByCategory() {
    this.productService.getProductsByCategory(this.categoryId).subscribe((products) => {
      this.products = products;
    });
  }

   /**
   * Navega a la página de detalles de un producto específico.
   * @param productId ID del producto a mostrar.
   */
  viewDetails(productId: number) {
    this.router.navigate(['/customer/dashboard/product-details', productId]);
  }

    /**
   * Retorna los productos a mostrar actualmente en el dropdown.
   * @returns Lista de productos limitados por `itemsToShow`.
   */
  displayedProducts() {
    return this.products.slice(0, this.itemsToShow);
  }

   /**
   * Indica si se debe mostrar el botón para cargar más productos.
   * @returns `true` si hay más productos disponibles, de lo contrario, `false`.
   */
  showLoadMoreButton() {
    return this.products.length > this.itemsToShow;
  }

    /**
   * Navega a la página que muestra todos los productos.
   */
  loadMore() {
    this.router.navigate(['/customer/allproducts']);
  }

    /**
   * Maneja la interacción del teclado en un producto del dropdown.
   * Permite navegar a los detalles del producto al presionar `Enter` o `Espacio`.
   * @param event Evento de teclado.
   * @param productId ID del producto seleccionado.
   */
  handleKeyDown(event: KeyboardEvent, productId: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.viewDetails(productId);
    }
  }
}
