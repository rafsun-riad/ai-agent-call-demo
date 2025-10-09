"use client";

import axios from "axios";
// import Cookies from "js-cookie";

// loading env variables
const BASE_URL = "https://api.verbex.ai";
const TOKEN = `API_v7WxPAfwGj-rlMD-Riym2Abt8uzyr_scyV2aGgEXA-jAmiqhz6eGTMm42Qandw3r`;

// generating headers
function getHeaders() {
  const token = TOKEN;
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export function useApi() {
  // get method
  async function get(endpoint: string) {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: getHeaders(),
    });
    return response;
  }

  // post method
  async function post(endpoint: string, data: object | FormData) {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers: getHeaders(),
    });
    return response;
  }

  // put method
  async function put(endpoint: string, data: object | FormData) {
    const response = await axios.put(`${BASE_URL}${endpoint}`, data, {
      headers: getHeaders(),
    });
    return response;
  }

  // patch method
  async function patch(endpoint: string, data: object | FormData) {
    const response = await axios.patch(`${BASE_URL}${endpoint}`, data, {
      headers: getHeaders(),
    });
    return response;
  }

  // delete method
  async function del(endpoint: string) {
    const response = await axios.delete(`${BASE_URL}${endpoint}`, {
      headers: getHeaders(),
    });
    return response;
  }

  return {
    get,
    post,
    put,
    patch,
    del,
    BASE_URL,
  };
}
