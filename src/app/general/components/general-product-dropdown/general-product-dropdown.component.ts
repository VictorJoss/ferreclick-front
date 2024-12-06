import { Component, Input } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';
import { Router } from '@angular/router';

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
 * Componente para mostrar un dropdown genérico con productos.
 * Este componente permite listar productos por categoría,
 * visualizar detalles de un producto y navegar a la página de todos los productos.
 */
@Component({
  // Selector del componente para usarlo en plantillas.
  selector: 'app-general-product-dropdown',
  // Indica que el componente es independiente.
  standalone: true,
   // Módulos importados (vacío en este caso).
  imports: [],
  // Ruta del archivo de plantilla HTML.
  templateUrl: './general-product-dropdown.component.html',
  // Ruta del archivo CSS.
  styleUrl: './general-product-dropdown.component.css'
})
export class GeneralProductDropdownComponent {
    /**
   * Título a mostrar en el encabezado del dropdown.
   */
  @Input() titulo: string = '';
    /**
   * URL de la imagen a mostrar en el encabezado del dropdown.
   */
  @Input() img: string = '';
    /**
   * ID de la categoría cuyos productos se mostrarán en el dropdown.
   */
  @Input() categoryId: number = 0;

   /**
   * Lista de productos obtenidos de la categoría seleccionada.
   */
  products: Product[] = [];
    /**
   * Cantidad inicial de productos a mostrar.
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
   * Carga los productos si se proporciona un ID de categoría.
   */
  ngOnInit() {
    if (this.categoryId) {
      this.loadProductsByCategory();
    }
  }

    /**
   * Obtiene los productos de la categoría especificada y los asigna a la lista local.
   */
  loadProductsByCategory() {
    this.productService.getProductsByCategory(this.categoryId).subscribe((products) => {
      this.products = products;
    });
  }

  /**
   * Navega a la página de detalles de un producto.
   * @param productId ID del producto a visualizar.
   */
  viewDetails(productId: number) {
    this.router.navigate(['/general/dashboard/product-details', productId]);
  }

    /**
   * Retorna los productos visibles actualmente en el dropdown.
   * @returns Subconjunto de la lista de productos basado en `itemsToShow`.
   */
  displayedProducts() {
    return this.products.slice(0, this.itemsToShow);
  }

    /**
   * Verifica si hay más productos disponibles para mostrar.
   * @returns `true` si hay más productos disponibles, de lo contrario, `false`.
   */
  showLoadMoreButton() {
    return this.products.length > this.itemsToShow;
  }

    /**
   * Navega a la página que muestra todos los productos.
   */
  loadMore() {
    this.router.navigate(['/general/allproducts'])
  }

    /**
   * Maneja las interacciones del teclado en el dropdown.
   * Permite navegar a los detalles del producto al presionar `Enter` o `Espacio`.
   * @param event Evento de teclado capturado.
   * @param productId ID del producto seleccionado.
   */
  handleKeyDown(event: KeyboardEvent, productId: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.viewDetails(productId);
    }
  }
}
