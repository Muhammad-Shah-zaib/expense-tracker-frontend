export interface IJwtToken {
  userId: string;
  FirstName: string;
  LastName: string;
  sub: string;
  email: string;
  jti: string;
  iss: string;
  aud: string;
  nbf: number;
  exp: number;
  iat: number;
}
