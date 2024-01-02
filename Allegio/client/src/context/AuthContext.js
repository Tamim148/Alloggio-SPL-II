import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

const parse = () => {
  try {
    const json = localStorage.getItem("user");
    if (json) return JSON.parse(json);
    return null;
  } catch (error) {
    return null;
  }
}

const INITIAL_STATE = {
  user: parse(),
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
     case "GOOGLE_LOGIN_SUCCESS":
      console.log("Dispatching GOOGLE_LOGIN_SUCCESS:", action.payload);
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    async function verifyToken() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          dispatch({type: "LOGOUT"});
          return;
        }
  
        const url = "http://localhost:8800/api/auth/token";
        const res = await axios.post(url, {token});
        if (res.status == 200)
        {
          dispatch({type: "LOGIN_SUCCESS", payload: res.data.user});
          
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
  
      } catch(error) {
        console.log(error)
      }    
    }
    verifyToken()
  },[])


  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    console.log(state.user)
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};