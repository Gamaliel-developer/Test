import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user.model';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(userId: string) {
    const isConfirmed = window.confirm('¿Estás seguro de eliminar este usuario?');

    if (isConfirmed) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          console.log('User deleted successfully');
          this.userService.getUsers().subscribe(
            (data) => {
              this.users = data;
            },
            (error) => {
              console.error('Error fetching users:', error);
            }
          );
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  navigateToEdit(userId: number) {
    this.router.navigate(['/editar', userId]);
  }

  
}
