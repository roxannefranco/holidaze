import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();

  // State
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Everytime accessToken changes runs this code
  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken == null) {
      setIsLoggedIn(false);
      return navigate("/login");
    }

    setIsLoggedIn(true);
  }, []);

  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;
