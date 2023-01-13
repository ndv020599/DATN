import axios from "axios";
export function AddNewUserService(data) {
  return axios.post("http://localhost:4000/users/signup", data);
}
export function DeleteUserService(id) {
  console.log(id);
  return axios.delete(`http://localhost:4000/users/profile/${id}`);
}
export function AllListUserService(data) {
  return axios.post("http://localhost:4000/users/search", data);
}

export function EditProfileService(id, data) {
  return axios.put(`http://localhost:4000/users/profile/${id}`, data);
}
export function EditChangePasswordService(data) {
  return axios.put("http://localhost:4000/users/changepass", data);
}

export function UserProfileService() {
  return axios.get("http://localhost:4000/users/profile");
}
