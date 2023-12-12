import axios from "../axios";

export const apiGetCurrent = (
  data //nham ten
) =>
  axios({
    method: "post",
    url: "/auth/loggin-success/",
    data,
  });
export const apiGetUser = (token) =>
  axios({
    method: "get",
    url: "/user/",
    headers: { Authorization: `Bearer ${token}` },
  });
