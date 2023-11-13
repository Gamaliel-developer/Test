import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Models/user.model';
import { UserService } from '../../user.service';
import {} from '../user-list/user-list.component'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userId!: number;
  user: User = {
    id: 0,
    Name: '',
    Phone: 0,
    Email: '',
    DOB: new Date(),
    Gender: ''
  };

  phonePattern = /^[0-9]{10}$/; 

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
  
    if (idParam !== null) {
      this.userId = +idParam;
  
      this.userService.getUserById(this.userId).subscribe(
        (response) => {
          this.user = response;
        },
        (error) => {
          console.error('Error al obtener detalles del usuario:', error);
        }
      );
    } else {
      console.error('El parámetro "id" es nulo en la ruta.');
    }
  }

  onSubmit() {
    if (this.isAdult(this.user.DOB) && this.phonePattern.test(this.user.Phone.toString()) && this.user.Email) {
      this.userService.putUser(this.userId.toString(), this.user).subscribe({
        next: (response) => {
          console.log('Usuario actualizado correctamente:', response);
          this.router.navigate(['/inicio']);
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      });
    }
  }

  private isAdult(dateOfBirth: Date): boolean {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassed = today.getMonth() > birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    return age > 18 || (age === 18 && hasBirthdayPassed);
  }

}


