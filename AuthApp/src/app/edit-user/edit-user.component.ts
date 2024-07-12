import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: number | null = null;
  userData: any = {};
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const parsedId = +id;
      if (!isNaN(parsedId)) {
        this.userId = parsedId;
        this.loadUser(this.userId);
      } else {
        this.errorMessage = 'Invalid user ID';
      }
    } else {
      this.errorMessage = 'User ID parameter not found';
    }
  }

  loadUser(id: number): void {
    this.authService.getUserById(id).subscribe({
      next: (data: any) => {
        this.userData = data;
      },
      error: (err: any) => {
        this.errorMessage = 'Error loading user data';
      }
    });
  }

  editUser(): void {
    if (this.userId !== null) {
      this.authService.editUser(this.userId, this.userData).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          this.errorMessage = 'Error updating user';
        }
      });
    } else {
      this.errorMessage = 'Invalid user ID';
    }
  }
}
