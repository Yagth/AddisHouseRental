import { setCookie } from "./cookie.js";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const saveCookie = (name, jsonData) => {
  const stringData = JSON.stringify(jsonData);
  setCookie(name, stringData, 1);
};

const getData = async (url, query = "") => {
  try {
    console.log("Url form getData: " + url + "?" + query);
    const res = await fetch(url + "?" + query, { method: "GET" });
    const data = await res.text();
    console.log(data);
    return data;
  } catch (error) {
    return { success: false, message: error };
  }
};

async function postData(url, formData) {
  try {
    const res = await fetch(url, { method: "POST", body: formData });
    const data = await res.text();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);

    return { success: false, message: error };
  }
}

export { shuffleArray, saveCookie, getData, postData };
