export interface User {
  firstName: string;
  lastNmae: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserDTO {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  pin: string;
}

export interface loginToken {
  token: string;
  expiresInSeconds: number;
  userDTO: UserDTO;
}
