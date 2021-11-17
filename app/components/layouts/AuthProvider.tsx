import { authAPI } from "app/api/modules/authAPI";
import { getAccessToken, logout, updateProfile } from "app/redux/features/user";
import jwt_decode from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AuthProvider(props) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchInfo = async () => {
      var expRefreshToken = jwt_decode(user.refreshToken)["exp"];
      if (expRefreshToken <= new Date().getTime() / 1000) {
        dispatch(logout());
      } else {
        //handle jwt expire
        var exp = jwt_decode(user.token)["exp"];
        if (exp <= new Date().getTime() / 1000) {
          const res = await authAPI.getAccessToken(user.refreshToken);
          if (res.status === 200) {
            console.log(res.data);
            dispatch(getAccessToken(res.data.accessToken));
          }
        }
      }
    };
    if (user.token !== "") fetchInfo();
  }, []);

  return <div className="flex-grow">{props.children}</div>;
}
