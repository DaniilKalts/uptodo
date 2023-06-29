import { FieldValues } from 'react-hook-form';

export interface ILoginInputs extends FieldValues {
  userName: string;
  password: string;
}

export interface IRegisterInputs extends FieldValues {
  userName: string;
  password: string;
  confirmPassword: string;
}
