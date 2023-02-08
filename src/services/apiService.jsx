import axios from "axios";

// export const API_URL = "http://localhost:3003";
export const API_URL = "https://average-shawl-lion.cyclic.app/"

export const TOKEN_NAME = "FOODS_TOKEN";

// export const USER_ROLE = "USER_ROLE"

export const doApiGet = async (_url, params = {}) => {
  try {
    let resp = await axios.get(_url, {
      params,
      headers: {
        "x-api-key": localStorage[TOKEN_NAME],
      },
    });
    return resp;
  } catch (err) {
    // throw-> בבקשות של פרומיס מזהים את זה בתור החזרת שגיאה
    throw err;
  }
};

// For Post,delete, put, patch
export const doApiMethod = async (_url, _method, _body = {}) => {
  try {
    console.log(_body);
    let resp = await axios({
      url: _url,
      method: _method,
      data: _body,
      headers: {
        "x-api-key": localStorage[TOKEN_NAME],
      },
    });
    return resp;
  } catch (err) {
    throw err;
  }
};

// For Post user-SignUp
//?do I need?
export const doApiMethodSignUp = async (_url, _method, _body = {}) => {
  try {
    console.log(_body);
    let resp = await axios({
      url: _url,
      method: _method,
      data: _body,
    });
    return resp;
  } catch (err) {
    throw err;
  }
};