import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, Input, PLATFORM_ID } from '@angular/core';


interface Product {
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-product-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './product-dropdown.component.html',
  styleUrl: './product-dropdown.component.css'
})
export class ProductDropdownComponent {
  @Input() titulo: string = '';
  @Input() img: string = '';


  searchTerm: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  products: Product[] = [
    { name: 'Producto 1', price: 29.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 2', price: 39.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 3', price: 19.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 4', price: 49.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 5', price: 25.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 6', price: 99.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 7', price: 89.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 8', price: 79.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 9', price: 29.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 10', price: 39.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 11', price: 19.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 12', price: 49.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 13', price: 25.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 14', price: 99.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 15', price: 89.99, image: 'https://via.placeholder.com/150' },
    { name: 'Producto 16', price: 79.99, image: 'https://via.placeholder.com/150' }
  ];

  // Controla cuántos productos mostrar
  itemsToShow: number = 4;
  increment: number = 4;

  // Captura el ancho de la pantalla y ajusta el número de productos a mostrar
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.adjustItemsToShow(event.target.innerWidth);
    }
  }

  // Inicialización para ajustar los elementos a mostrar según el tamaño de la pantalla
  ngOnInit() {
    // Solo accede a window si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.adjustItemsToShow(window.innerWidth);
    }
  }

  // Ajusta el número de elementos que se deben mostrar según el tamaño de la pantalla
  adjustItemsToShow(width: number) {
    if (width < 640) {
      this.itemsToShow = 4; // 4 productos en dispositivos móviles
      this.increment = 4;
    } else if (width < 1024) {
      this.itemsToShow = 6; // 6 productos en tablets (2 filas de 2 columnas)
      this.increment = 6;
    } else {
      this.itemsToShow = 8; // 8 productos en PC (2 filas de 4 columnas)
      this.increment = 8;
    }
  }

  // Muestra solo los productos filtrados hasta el límite actual
  displayedProducts() {
    return this.filteredProducts().slice(0, this.itemsToShow);
  }

  // Filtra productos según el término de búsqueda
  filteredProducts() {
    if (!this.searchTerm) {
      return this.products;
    }
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Muestra el botón "Mostrar más" solo si hay más productos por mostrar
  showLoadMoreButton() {
    return this.filteredProducts().length > this.itemsToShow;
  }

  // Incrementa la cantidad de elementos mostrados
  loadMore() {
    this.itemsToShow += this.increment;
  }
}
