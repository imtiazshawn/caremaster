import { setTokenToLocalStorage } from "@redux/localStore/token";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTokenToLocalStorage("");
    navigate("/signin");
  }, [navigate]);

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      Logging out...
    </div>
  );
};
