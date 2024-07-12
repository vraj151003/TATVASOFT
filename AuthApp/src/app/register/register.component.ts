import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData: any = {};
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.authService.register(this.registerData).subscribe({
      next: (data) => this.router.navigate(['/login']),
      error: (err) => this.errorMessage = 'Registration failed'
    });
  }
}
