import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Models/user.model';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  user: User = {
    id: 0,
    Name: '',
    Phone: 0,
    Email: '',
    DOB: new Date(),
    Gender: ''
  };

  phonePattern = /^[0-9]{10}$/; 

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.isAdult(this.user.DOB) && this.phonePattern.test(this.user.Phone.toString()) && this.user.Email) {
      this.userService.postUser(this.user).subscribe(
        (response) => {
          console.log('Usuario agregado correctamente:', response);
          this.router.navigate(['/inicio']);
        },
        (error) => {
          console.error('Error al agregar usuario:', error);
        }
      );
    } else {
      console.warn('Verifica los datos del formulario.');
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

