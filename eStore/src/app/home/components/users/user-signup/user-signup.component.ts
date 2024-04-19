import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validator,
} from '@angular/forms';
import { matchPasswords } from './validators/match-passwords.validator';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss',
})
export class UserSignupComponent implements OnInit {
  userSignUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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
        password: ['', Validators.required],
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

  onSubmit(): void {}
}
