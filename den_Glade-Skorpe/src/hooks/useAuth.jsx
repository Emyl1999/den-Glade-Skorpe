import { useLocalStorage } from "@uidotdev/usehooks";
import { jwtDecode } from "jwt-decode"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Hook used to authenticate the user
const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useLocalStorage("user", {});
  const [auth, setAuth] = useLocalStorage("auth", {});
  const navigate = useNavigate();

  // Function that handles the signin
  const signIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3042/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login fejlede.");
      }

      const result = await response.json();
      const user = jwtDecode(result.data.token);
      setUser(user);
      setAuth({ token: result.data.token });
      navigate("/backoffice");
    } catch (err) {
      setError(err.message);
    }
  };

  // Function that handles the signout
  const signOut = () => {
    setAuth({});
    setUser({});
  };

  // Returns the token from the auth user if it exists.
  const token = auth.token ? auth.token : "";
  const signedIn = !!auth.token;

  return {
    signIn,
    signOut,
    user,
    token,
    signedIn,
    email,
    setEmail,
    password,
    setPassword,
    error,
  };
};

export default useAuth;
