export type IUser = {
  at_hash: string;
  aud: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: boolean;
  iss: string;
  locale: string;
  name: string;
  nickname: string;
  nonce: string;
  picture: string;
  sub: string;
  updated_at: string;
};

export interface Login {
  email: string;
  password: string;
}

export interface SignUp {
  username: string;
  password: string;
  email: string;
  name: string;
  yearOfBirth: number;
  address: string;
  statusId: string;
  roleId: string;
}

export interface Data {
  email: string;
  name: string;
}
export interface LoginSocial {
  statusCode: number;
  data: Data;
}
