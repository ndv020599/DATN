import axios from "axios";
export function SignInService(account) {
  return axios.post("http://localhost:4000/users/login", account);
}
