import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private baseUrl = 'https://localhost:7027/api/Register';
  private loginUrl = 'https://localhost:7027/api/Login';
  private registerUrl = 'https://localhost:7027/api/Register/register';
  private editUserUrl = 'https://localhost:7027/api/Register/edit';
  private deleteUserUrl = 'https://localhost:7027/api/Register/delete';
  private getUserUrl = 'https://localhost:7027/api/Register/';  // Assuming this endpoint exists

  constructor(private http: HttpClient) {}

  register(userData: any) {
    return this.http.post<any>(this.registerUrl, userData)
      .pipe(catchError(this.handleError));
  }

  login(userData: any) {
    return this.http.post<any>(this.loginUrl, userData)
      .pipe(catchError(this.handleError));
  }

  editUser(userId: number, userData: any) {
    return this.http.put<any>(`${this.editUserUrl}/${userId}`, userData)
      .pipe(catchError(this.handleError));
  }

  deleteUser(userId: number) {
    const deleteUrl = `${this.baseUrl}/delete/${userId}`; // Construct the delete URL
    return this.http.delete<any>(deleteUrl)
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`)
      .pipe(catchError(this.handleError));
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
