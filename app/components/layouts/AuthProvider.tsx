import { authAPI } from "app/api/modules/authAPI";
import {
  getNewAccessToken,
  logout,
  updateProfile,
} from "app/redux/features/user";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingFullPage from "../molecules/LoadingFullPage";

export default function AuthProvider(props) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      var expRefreshToken = jwt_decode(user.refreshToken)["exp"];
      if (expRefreshToken <= new Date().getTime() / 1000) {
        dispatch(logout());
      } else {
        //handle jwt expire
        var exp = jwt_decode(user.token)["exp"];
        if (exp <= new Date().getTime() / 1000) {
          const res = await authAPI.getAccessToken(user.refreshToken);
          if (res.status === 200) {
            dispatch(getNewAccessToken(res.data.accessToken));
          }
        }
      }
      setLoading(false);
    };
    if (user.token !== "") fetchInfo();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingFullPage />
      ) : (
        <div className="flex-grow">{props.children}</div>
      )}
    </div>
  );
}
