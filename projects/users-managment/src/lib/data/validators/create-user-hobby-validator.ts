import { maxLength, minLength, required, schema } from '@angular/forms/signals';

export const createUserHobbiesSchema = schema<{ hobby: string }>((context) => {
  (required(context.hobby, {
    message: 'Hobby is required',
  }),
    minLength(context.hobby, 1, {
      message: 'Hobby must be at least 1 character',
    }),
    maxLength(context.hobby, 255, {
      message: 'Hobby must be at most 255 characters',
    }));
});
