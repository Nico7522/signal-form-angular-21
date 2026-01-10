import {
  applyEach,
  customError,
  maxLength,
  minLength,
  required,
  schema,
  validate,
} from '@angular/forms/signals';
import { createUserHobbiesSchema, type CreateUserForm } from '..';

export const createUserFormSchema = schema<CreateUserForm>((context) => {
  (required(context.user.name, {
    message: 'Name is required',
  }),
    required(context.user.email, {
      message: 'Email is required',
    }),
    required(context.password, {
      message: 'Password is required',
    }),
    required(context.confirmPassword, {
      message: 'Confirm Password is required',
    }),
    required(context.user.address.city, {
      message: 'City is required',
    }),
    required(context.user.address.state, {
      message: 'State is required',
    }),
    required(context.user.address.country, {
      message: 'Country is required',
    }),
    required(context.user.address.zip, {
      message: 'Zip is required',
    }),
    required(context.user.address, {
      message: 'Address is required',
    }),
    required(context.user.phone, {
      message: 'Phone is required',
    }),
    required(context.user.role, {
      message: 'Role is required',
    }),
    minLength(context.user.name, 3, {
      message: 'Name must be at least 3 characters',
    }),
    maxLength(context.user.name, 255, {
      message: 'Name must be at most 255 characters',
    }),
    minLength(context.user.email, 3, {
      message: 'Email must be at least 3 characters',
    }),
    maxLength(context.user.email, 255, {
      message: 'Email must be at most 255 characters',
    }),
    minLength(context.password, 8, {
      message: 'Password must be at least 8 characters',
    }),
    maxLength(context.password, 255, {
      message: 'Password must be at most 255 characters',
    }));

  validate(context.confirmPassword, (ctx) => {
    const constPasswordValue = ctx.value();
    const passwordValue = ctx.valueOf(context.password);
    if (constPasswordValue !== passwordValue) {
      return customError({ kind: 'password-mismatch', message: 'Passwords do not match' });
    }

    return null;
  });
  applyEach(context.user.hobbies, createUserHobbiesSchema);
});
