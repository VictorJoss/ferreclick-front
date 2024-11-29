import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  generalError: string | null = null;
  backendError: string | null = null;
  passwordMismatch: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  form = signal<FormGroup>(
    new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      role: new FormControl("CUSTOMER", [Validators.required])
    })
  );

  onSubmit(): void {
    this.generalError = null;
    this.backendError = null;

    const password = this.form().get('password')?.value;
    const confirmPassword = this.form().get('confirmPassword')?.value;

    // Verificar si el formulario es válido
    if (this.form().invalid) {
      this.generalError = 'Por favor, completa todos los campos requeridos.';
      Object.values(this.form().controls).forEach(control => control.markAsTouched());
      return;
    }

    // Verificar si las contraseñas coinciden
    this.passwordMismatch = password !== confirmPassword;
    if (this.passwordMismatch) {
      this.generalError = 'Las contraseñas no coinciden.';
      return;
    }

    const { confirmPassword: _, ...formValue } = this.form().value;

    this.authService.register(formValue.name, formValue.name, formValue.email, formValue.password, formValue.role).subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        this.backendError = error.error?.message || 'Error al registrar. Inténtalo de nuevo.';
        console.log('desdesignup')
      }
    });
  }
}
