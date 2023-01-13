import axios from "axios";
export function AddNewBook(data) {
  return axios.post("http://localhost:4000/book", data);
}
export function AllListBook(data) {
  return axios.post("http://localhost:4000/book/search", data);
}

export function DeleteBook(id) {
  //   console.log(id);
  return axios.delete(`http://localhost:4000/book/${id}`);
}
export function EditBook(id, data) {
  console.log(id);
  return axios.put(`http://localhost:4000/book/${id}`, data);
}

export function AllListCategory(data) {
  return axios.post("http://localhost:4000/category/search", data);
}

export function AddNewCategory(data) {
  return axios.post("http://localhost:4000/category", data);
}
export function EditCategory(id, data) {
  // console.log(id);
  return axios.put(`http://localhost:4000/category/${id}`, data);
}

export function DeleteCategory(id) {
  //   console.log(id);
  return axios.delete(`http://localhost:4000/category/${id}`);
}
export function AddNewBookRequest(data) {
  return axios.post("http://localhost:4000/request", data);
}

export function AllListBookRequestService(data) {
  return axios.post("http://localhost:4000/request/searchByAll", data);
}

export function AllListUserRequestService(data) {
  return axios.post("http://localhost:4000/request/searchByBook", data);
}

export function AllListRequestOfUser(data) {
  return axios.post("http://localhost:4000/request/search", data);
}

export function UpdateRequestBook(data) {
  return axios.post("http://localhost:4000/request/status", data);
}

export function DeleteRequestBook(id) {
  return axios.delete(`http://localhost:4000/request/${id}`);
}

export function SearchBookByCode(data) {
  return axios.post("http://localhost:4000/book/searchByCode", data);
}
