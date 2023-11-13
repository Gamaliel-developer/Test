
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './Models/user.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuarios`);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${userId}`);
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/usuarios`, user);
  }

  putUser(userId: string, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/usuarios/${userId}`, updatedUser);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/usuarios/${userId}`);
  }
}