import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { IAuthContext, IAuthState } from "../types/auth";
import { constants } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

type AuthAction =
  | { type: typeof constants.LOGIN_SUCCESS }
  | { type: typeof constants.LOGIN_FAILURE }
  | { type: typeof constants.LOGOUT };

function authReducer(state: IAuthState, action: AuthAction): IAuthState {
  switch (action.type) {
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case constants.LOGIN_FAILURE:
      return { ...state, isAuthenticated: false };
    case constants.LOGOUT:
      localStorage.removeItem(constants.AUTH_TOKEN);
      return initialState;
    default:
      return state;
  }
}

interface IAuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const login = () => dispatch({ type: constants.LOGIN_SUCCESS });

  const logout = () => {
    dispatch({ type: constants.LOGOUT });
    navigate("/login");
  };

  const value = {
    ...state,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
