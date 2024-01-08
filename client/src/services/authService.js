import { userSignup } from "../redux/features/auth/authAction";
import { userLogin } from "../redux/features/auth/authAction";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please Privde All Feilds");
    }
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};

export const handleSignup = (e,email,password,role,name,organisationName,hospitalName,website,address,phone) => {
  e.preventDefault();
  try {
    store.dispatch(userSignup({ email,password,role,name,organisationName,hospitalName,website,address,phone}));
  } catch (error) {
    console.log(error);
  }
};