export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  address: string;
  phone: string;
  role: string;
  hobbies: { hobby: string }[];
}

export type UserList = User[];
