import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "../../redux/localStore/token";

export const useAuthentication = () => {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(getTokenFromLocalStorage());
  useEffect(() => {
    if (!isAuthenticated) {
      setTokenToLocalStorage("");
      navigate("/signin");
    }
  }, [navigate, isAuthenticated]);

  return isAuthenticated;
};
