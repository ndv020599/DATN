import axios from "axios";

export function HomePageService() {
  return axios.get("http://localhost:4000/dashboard");
}
