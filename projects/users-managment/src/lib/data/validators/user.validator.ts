import {
  minLength,
  maxLength,
  required,
  type SchemaPathTree,
  applyEach,
  validate,
  customError,
} from '@angular/forms/signals';
import { type User } from '../models/user';
import { createUserHobbiesSchema } from './create-user-hobby-validator';
import { type Address } from '../models/address';
import { type Passwords } from '..';

export function buildUserValidator(a: SchemaPathTree<Omit<User, 'id'>>) {
  return (
    required(a.name, {
      message: 'Name is required',
    }),
    required(a.email, {
      message: 'Email is required',
    }),
    required(a.phone, {
      message: 'Phone is required',
    }),
    required(a.role, {
      message: 'Role is required',
    }),
    minLength(a.name, 3, {
      message: 'Name must be at least 3 characters',
    }),
    maxLength(a.name, 255, {
      message: 'Name must be at most 255 characters',
    }),
    minLength(a.email, 3, {
      message: 'Email must be at least 3 characters',
    }),
    maxLength(a.email, 255, {
      message: 'Email must be at most 255 characters',
    }),
    applyEach(a.hobbies, createUserHobbiesSchema)
  );
}

export function buildAddressValidator(a: SchemaPathTree<Address>) {
  return (
    required(a.city, {
      message: 'City is required',
    }),
    required(a.state, {
      message: 'State is required',
    }),
    required(a.country, {
      message: 'Country is required',
    }),
    required(a.zip, {
      message: 'Zip is required',
    })
  );
}

export function buildPasswordValidator(a: SchemaPathTree<Passwords>) {
  return (
    required(a.password, {
      message: 'Password is required',
    }),
    required(a.confirmPassword, {
      message: 'Confirm Password is required',
    }),
    validate(a.confirmPassword, (ctx) => {
      const constPasswordValue = ctx.value();
      const passwordValue = ctx.valueOf(a.password);
      if (constPasswordValue !== passwordValue) {
        return customError({ kind: 'password-mismatch', message: 'Passwords do not match' });
      }
      return null;
    })
  );
}
