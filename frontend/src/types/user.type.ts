export type User = {
  name: string;
  email: string;
  token?:string|undefined;
};

export type UserRegister = {
  name: string;
  email: string;
  password: string;
};
