import { axiosInstance } from "../utils/axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.error(err.response.data);
    dispatch(loginFailure(err.response.data));
    console.log(err);
  }
};
