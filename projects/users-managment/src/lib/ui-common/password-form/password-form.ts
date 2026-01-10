import { Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';

@Component({
  selector: 'lib-password-form',
  imports: [Field],
  templateUrl: './password-form.html',
  styleUrl: './password-form.css',
})
export class PasswordForm {
  password = input.required<FieldTree<string>>();
  confirmPassword = input.required<FieldTree<string>>();
}
