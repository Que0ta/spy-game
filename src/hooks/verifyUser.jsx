import { useEffect, useContext } from "react";
import { data, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export function useVerifyUser(directTO) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("http://localhost:2000/dashboard", {
          method: "GET",
          credentials: "include",
        });
        if (res.status === 200) {
          const data = await res.json();
          setUser(data.user); // update context
          navigate(directTO); // redirect
        } else {
          navigate("/"); // not logged in
        }
      } catch (err) {
        console.log("Not logged in", err);
        navigate("/");
      }
    };

    checkUser();
  }, [navigate, directTO, setUser]);
}
