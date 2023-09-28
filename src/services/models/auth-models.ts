export interface UserCreationParams {
    email: string;
    name: string;
    username: string;
    password: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
  }
  
  export interface UserAndCredentials {
    user: User;
    token: string;
    refresh: string;
  }
// code we had written in this file before goes here ...

export interface LoginParams {
  email: string;
  password: string;
}

// your other interfaces go here ...

export interface RefreshParams {
  email: string;
  refreshToken: string;
}