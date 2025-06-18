export interface IUser {
  id: string;
  email: string;
  name: string;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}
