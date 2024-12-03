import { Component } from '@angular/core';

interface Product {
  name: string;
  image: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  products: Product[] = [
    { name: 'Product 1', image: 'Hero1.jpg' },
    { name: 'Product 2', image: 'Hero2.jpg' },
    { name: 'Product 3', image: 'Hero3.jpg' },
  ];

  currentIndex: number = 0;
  intervalId: any;

  ngOnInit() {
    // this.startAutoSlide();
  }

  ngOnDestroy() {
    // this.stopAutoSlide();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.products.length - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex < this.products.length - 1) ? this.currentIndex + 1 : 0;
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // Cambia de imagen cada 3 segundos
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
