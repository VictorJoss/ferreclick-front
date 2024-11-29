import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
})
export class AdminCategoriesComponent implements OnInit{
  categories:any[];

  constructor(private categoryService:CategoryService, private router:Router ){}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias():void{
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  irACrearCategoria():void{
    this.router.navigate(['/admin/category/create'])
  }


}
