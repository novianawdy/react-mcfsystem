import Axios from "axios";
import setting from "../settings/setting";

export const baseUrl = () => setting.baseUrl;

export const auth = () => localStorage.getItem("bearer");

export const apiGet = async (url, isFullUrl = false) => {
  return await Axios({
    method: "GET",
    url: isFullUrl ? url : baseUrl() + "api/" + url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: auth()
    },
    timeout: 0
  })
    .then(res => res.data)
    .catch(error => console.log(error));
};

export const apiGetNoAuth = async (url, isFullUrl = false) => {
  return await Axios({
    method: "GET",
    url: isFullUrl ? url : baseUrl() + "api/" + url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    timeout: 0
  })
    .then(res => res.data)
    .catch(error => console.log(error));
};

export const apiPost = async (url, post, isFullUrl = false) => {
  return await Axios({
    method: "POST",
    data: JSON.stringify(post),
    url: isFullUrl ? url : baseUrl() + "api/" + url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: auth()
    },
    timeout: 0
  })
    .then(res => res.data)
    .catch(error => console.log(error));
};

export const apiPostNoAuth = async (url, post, isFullUrl = false) => {
  return await Axios({
    method: "POST",
    data: JSON.stringify(post),
    url: isFullUrl ? url : baseUrl() + "api/" + url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    timeout: 0
  })
    .then(res => res.data)
    .catch(error => console.log(error));
};

export const apiPut = async (url, post, isFullUrl = false) => {
  return await Axios({
    method: "PUT",
    data: JSON.stringify(post),
    url: isFullUrl ? url : baseUrl() + "api/" + url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: auth()
    },
    timeout: 0
  })
    .then(res => res.data)
    .catch(error => console.log(error));
};

export const apiPutNoAuth = async (url, post, isFullUrl = false) => {
  return await Axios({
    method: "PUT",
    data: JSON.stringify(post),
    url: isFullUrl ? url : baseUrl() + "api/" + url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    timeout: 0
  })
    .then(res => res.data)
    .catch(error => console.log(error));
};
