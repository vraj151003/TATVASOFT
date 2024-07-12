import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common'; // Import Location service

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private location: Location // Inject Location service
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        this.errorMessage = 'Error loading users';
        console.error(err);
      }
    });
  }

  deleteUser(id: number): void {
    this.authService.deleteUser(id).subscribe({
      next: () => {
        // Remove the deleted user from the local list
        this.users = this.users.filter(user => user.id !== id);
        alert('User deleted successfully');
        
        // Reload the current route to reflect changes
        this.location.go(this.location.path());
      },
      error: (err) => {
        console.error(err);
        alert('Error deleting user');
      }
    });
  }
}
