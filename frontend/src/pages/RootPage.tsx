import { useLocation, useNavigate } from "react-router";
import useFetch from "../fetch/useFetch.ts";
import { useEffect } from "react";
import useUserContext from "../context/UserContext.tsx";

function RootPage() {
  const [user, setUser] = useUserContext();
  const { data, error, isLoading } = useFetch("http://localhost:5008/api/me", {
    headers: {
      authorization: localStorage.getItem("token")
    }

  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && data) setUser(data as Record<string, any>)
  }, [data])

  if (!user && location.pathname !== "/login") navigate("/login");
  if (user?.role === "agent" && location.pathname === "/") navigate("/agentHomepage");
  if (user?.role === "admin" && location.pathname === "/") navigate("/adminHomepage");

  if (error)

    return (
      <>
        {isLoading && <h1 className="loadingText">טוען נתונים...</h1>}
        {!user && location.pathname !== "/login" && navigate("/login")}
        {user?.role === "admin" && navigate("/adminHomePage")}
        {user?.role === "agent" && navigate("/agentHomePage")}
      </>
    )
}

export default RootPage