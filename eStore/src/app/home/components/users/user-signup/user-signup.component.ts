import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validator,
} from '@angular/forms';
import { matchPasswords } from './validators/match-passwords.validator';
import { UserService } from '../services/user-service.service';
import { User } from '../../../types/user.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss',
})
export class UserSignupComponent implements OnInit {
  userSignUpForm: FormGroup;
  alertMessage: string = '';
  alertType: number = 0; // 0-success 1-error

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSignUpForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: [''],
        address: [''],
        city: [''],
        state: [''],
        pin: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: matchPasswords,
      }
    );
  }

  get firstName(): AbstractControl<any, any> | null {
    return this.userSignUpForm.get('firstName');
  }

  get email(): AbstractControl<any, any> | null {
    return this.userSignUpForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userSignUpForm.get('password');
  }

  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userSignUpForm.get('confirmPassword');
  }

  onSubmit(): void {
    const user: User = {
      firstName: this.firstName?.value,
      lastNmae: this.userSignUpForm.get('lastName')?.value,
      address: this.userSignUpForm.get('address')?.value,
      city: this.userSignUpForm.get('city')?.value,
      state: this.userSignUpForm.get('state')?.value,
      pin: this.userSignUpForm.get('pin')?.value,
      email: this.email?.value,
      password: this.password?.value,
    };

    this.userService.createUser(user).subscribe({
      next: (result) => {
        this.alertMessage = 'User created successfully';
        this.alertType = 0;
      },
      error: (error) => {
        console.log(error);

        this.alertMessage = error.error.description;
        this.alertType = 1;
      },
    });
  }
}
