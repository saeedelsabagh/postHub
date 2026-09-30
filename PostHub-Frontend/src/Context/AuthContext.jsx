import { createContext, useContext, useReducer } from "react";
import api from "../API/api";

const AuthContext = createContext(null);
const initialState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: "" };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error: "",
      };
    case "LOGIN_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...initialState,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

function decodeJwtPayload(token) {
  const payload = token.split(".")[1];
  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(normalized));
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function login(email, password) {
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await api.post("/login", { email, password });
      const token = response.data;
      const payload = decodeJwtPayload(token);
      const rawRole = payload.role ?? payload.authorities?.[0] ?? null;
      const role =
        typeof rawRole === "string" ? rawRole.replace(/^ROLE_/, "") : rawRole;
      const user = {
        id: payload.id ?? payload.userId ?? null,
        email: payload.sub ?? payload.email ?? email,
        role,
      };
      dispatch({ type: "LOGIN_SUCCESS", payload: { token, user } });
      return true;
    } catch (e) {
      dispatch({
        type: "LOGIN_ERROR",
        payload:
          e.response?.data?.message ||
          e.response?.data?.error ||
          "Invalid email or password",
      });
      return false;
    }
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }
  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
