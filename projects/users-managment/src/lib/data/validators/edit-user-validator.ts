import { applyEach, maxLength, minLength, required, schema } from '@angular/forms/signals';
import { createUserHobbiesSchema, type User } from '..';

export const editUserSchema = schema<User>((context) => {
  (required(context.name, {
    message: 'Name is required',
  }),
    required(context.email, {
      message: 'Email is required',
    }),
    required(context.address.city, {
      message: 'City is required',
    }),
    required(context.address.state, {
      message: 'State is required',
    }),
    required(context.address.country, {
      message: 'Country is required',
    }),
    required(context.address.zip, {
      message: 'Zip is required',
    }),
    required(context.phone, {
      message: 'Phone is required',
    }),
    required(context.role, {
      message: 'Role is required',
    }),
    minLength(context.name, 3, {
      message: 'Name must be at least 3 characters',
    }),
    maxLength(context.name, 255, {
      message: 'Name must be at most 255 characters',
    }),
    minLength(context.email, 3, {
      message: 'Email must be at least 3 characters',
    }),
    maxLength(context.email, 255, {
      message: 'Email must be at most 255 characters',
    }),
    applyEach(context.hobbies, createUserHobbiesSchema));
});
