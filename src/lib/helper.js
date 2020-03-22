import Axios from "axios";
import setting from "../settings/setting";

export const baseUrl = () => setting.baseUrl;

export const auth = () => getLocal("at") || getSession("at");

export const getResponsiveHeight = height =>
  height - 285 < 200 ? height : height - 285;

/**
 *
 * @param {string} url
 * @param {Boolean} isFullUrl
 */
export const apiGet = async (url, isFullUrl = false) => {
  return await Axios({
    method: "GET",
    url: isFullUrl ? url : baseUrl() + "api/" + url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${auth()}`
    },
    timeout: 0
  })
    .then(res => res.data)
    .catch(error => {
      console.log(error);

      const { response } = error;
      if (response) {
        return response.data;
      } else {
        return;
      }
    });
};

/**
 *
 * @param {string} url
 * @param {Boolean} isFullUrl
 */
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
    .catch(error => {
      console.log(error);

      const { response } = error;
      if (response) {
        return response.data;
      } else {
        return;
      }
    });
};

/**
 *
 * @param {string} url
 * @param {JSON} post
 * @param {Boolean} isFullUrl
 */
export const apiPost = async (url, post, isFullUrl = false) => {
  return await Axios({
    method: "POST",
    data: JSON.stringify(post),
    url: isFullUrl ? url : baseUrl() + "api/" + url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${auth()}`
    },
    timeout: 0
  })
    .then(res => res.data)
    .catch(error => {
      console.log(error);

      const { response } = error;
      if (response) {
        return response.data;
      } else {
        return;
      }
    });
};

/**
 *
 * @param {string} url
 * @param {JSON} post
 * @param {Boolean} isFullUrl
 */
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
    .catch(error => {
      console.log(error);

      const { response } = error;
      if (response) {
        return response.data;
      } else {
        return;
      }
    });
};

/**
 *
 * @param {string} url
 * @param {JSON} post
 * @param {Boolean} isFullUrl
 */
export const apiPut = async (url, post, isFullUrl = false) => {
  return await Axios({
    method: "PUT",
    data: JSON.stringify(post),
    url: isFullUrl ? url : baseUrl() + "api/" + url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${auth()}`
    },
    timeout: 0
  })
    .then(res => res.data)
    .catch(error => {
      console.log(error);

      const { response } = error;
      if (response) {
        return response.data;
      } else {
        return;
      }
    });
};

/**
 *
 * @param {string} url
 * @param {JSON} post
 * @param {Boolean} isFullUrl
 */
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
    .catch(error => {
      console.log(error);

      const { response } = error;
      if (response) {
        return response.data;
      } else {
        return;
      }
    });
};

/**
 *
 * @param {number} length panjang id
 */
export const makeId = length => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 *
 * @param {number} min
 * @param {number} max
 */
export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 *
 * @param {string} string string yang akan diencrypt
 * @returns {string} string yang sudah diencrypt
 */
export const encryptString = string => {
  return `${makeId(7)}${string}${makeId(5)}`;
};

/**
 *
 * @param {string} string string yang akan didecrypt
 * @returns {string} string yang sudah didecrypt
 */
export const decryptString = string => {
  return string.substr(7, string.length - 7 - 5);
};

/**
 *
 * @param {string} key string key yang akan disimpan
 * @param {string} value string value yang akan disimpan
 * @returns {boolean}
 */
export const saveLocal = (key, value) => {
  let saved = JSON.parse(localStorage.getItem("saved")) || { key: [] };
  value = encryptString(value);

  if (!getLocalKey(key)) {
    key = encryptString(key);
    saved.key.push(key);
  } else {
    key = getLocalKey(key);
  }
  localStorage.setItem(key, value);
  localStorage.setItem("saved", JSON.stringify(saved));
  return true;
};

/**
 *
 * @param {string} key string key yang akan diambil
 * @returns {string} value string yang sudah diambil
 */
export const getLocal = key => {
  let saved = JSON.parse(localStorage.getItem("saved")) || { key: [] };
  if (saved.key.length === 0) {
    return undefined;
  }

  const savedKey = saved.key.find(data => decryptString(data) === key);
  const savedValue = decryptString(localStorage.getItem(savedKey));

  return savedValue;
};

/**
 *
 * @param {string} key string key yang akan diambil
 * @returns {string} value string yang sudah diambil
 */
export const getLocalKey = key => {
  let saved = JSON.parse(localStorage.getItem("saved")) || { key: [] };
  if (saved.key.length === 0) {
    return undefined;
  }

  const savedKey = saved.key.find(data => decryptString(data) === key);

  return savedKey ? savedKey : undefined;
};

/**
 *
 * @param {string} key string key yang akan disimpan
 * @param {string} value string value yang akan disimpan
 * @returns {boolean}
 */
export const saveSession = (key, value) => {
  let saved = JSON.parse(sessionStorage.getItem("saved")) || { key: [] };
  value = encryptString(value);

  if (!getSessionKey(key)) {
    key = encryptString(key);
    saved.key.push(key);
  } else {
    key = getSessionKey(key);
  }
  sessionStorage.setItem(key, value);
  sessionStorage.setItem("saved", JSON.stringify(saved));
  return true;
};

/**
 *
 * @param {string} key string key yang akan diambil
 * @returns {string} value string yang sudah diambil
 */
export const getSession = key => {
  let saved = JSON.parse(sessionStorage.getItem("saved")) || { key: [] };

  if (saved.key.length === 0) {
    return undefined;
  }

  const savedKey = saved.key.find(data => decryptString(data) === key);
  const savedValue = decryptString(sessionStorage.getItem(savedKey));

  return savedValue;
};

/**
 *
 * @param {string} key string key yang akan diambil
 * @returns {string} value string yang sudah diambil
 */
export const getSessionKey = key => {
  let saved = JSON.parse(sessionStorage.getItem("saved")) || { key: [] };
  if (saved.key.length === 0) {
    return undefined;
  }

  const savedKey = saved.key.find(data => decryptString(data) === key);

  return savedKey ? savedKey : undefined;
};
