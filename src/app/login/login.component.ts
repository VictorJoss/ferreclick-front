import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // formulario de inicio de sesión
  form: FormGroup;
  generalError: string | null = null; // Para mostrar un error general encima del botón

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // formulario
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  // metodo de envio del formulario
  onSubmit(): void {
    if (this.form.invalid) {
      this.markFieldsAsTouched(); // Marca los campos inválidos como tocados
      return;
    }

    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    this.authService.login(email, password).subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          if (UserStorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('admin/dashboard');
          } else if (UserStorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('customer/dashboard');
          }
        } else {
          this.generalError = 'La cuenta no existe o las credenciales son incorrectas.';
        }
      },
      error: () => {
        this.generalError = 'Ocurrió un error al intentar iniciar sesión.';
      }
    });
  }

  private markFieldsAsTouched(): void {
    // Marca todos los campos como tocados para mostrar los errores
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
