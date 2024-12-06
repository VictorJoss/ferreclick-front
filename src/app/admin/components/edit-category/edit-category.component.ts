import { Component, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../admin-navbar/navbar.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit{

  categoryId:any;
  category:any;

  constructor(private categoryService:CategoryService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.category = this.getCategory();
  }

  categoryFrom = signal<FormGroup>(
    new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    })
  );

  editCategory():void{

    const categoryDTO = {
      id: this.categoryId,
      name: this.categoryFrom().get('name').value,
      description: this.categoryFrom().get('description').value,
      productIds: []
    }

    this.categoryService.uploadCategory(categoryDTO).subscribe({
      next: (response) =>{
        this.router.navigate(['admin/category']);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getCategory():void{
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (response) =>{
        this.category = response;
        this.cargarFormulario();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  cargarFormulario():void{
    this.categoryFrom().patchValue({
      name: this.category.name,
      description: this.category.description
    })
  }

}
