import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import {API_ENDPONT} from "../util/apiEnpoint";
import axiosConfig from "../util/AxiosConfig";

export const useUser = () => {
  const { user, setUser, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      return;
    }

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const respond = await axiosConfig.get(API_ENDPONT.GET_USER_INFO);
        if (isMounted && respond.data) {
          setUser(respond.data);
        }
      } catch (e) {
        console.error(e);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    }
    fetchUserInfo();
    return () => {
        isMounted = false;
    }
    }, [setUser, clearUser, navigate]);
}