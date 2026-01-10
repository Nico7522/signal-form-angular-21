import { Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { Address } from '../../data';

@Component({
  selector: 'lib-adress-form',
  imports: [Field],
  templateUrl: './adress-form.html',
  styleUrl: './adress-form.css',
})
export class AdressForm {
  inputForm = input.required<FieldTree<Address>>();
}
