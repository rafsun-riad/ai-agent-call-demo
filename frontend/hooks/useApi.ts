"use client";

import axios from "axios";
// import Cookies from "js-cookie";

// Use local API routes to avoid CORS issues
const BASE_URL = "/api";

// generating headers
function getHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

export function useApi() {
  // Helper function to construct the full URL
  function getFullUrl(endpoint: string) {
    // If endpoint already starts with /api/, use it as is for client-side
    if (endpoint.startsWith("/api/")) {
      // For server-side rendering, we need a full URL
      if (typeof window === "undefined") {
        // During SSR, construct full URL using localhost
        return `http://localhost:3000${endpoint}`;
      }
      return endpoint;
    }
    // Otherwise, prepend BASE_URL
    const baseUrl =
      typeof window === "undefined" ? "http://localhost:3000/api" : BASE_URL;
    return `${baseUrl}${endpoint}`;
  }

  // get method
  async function get(endpoint: string) {
    const response = await axios.get(getFullUrl(endpoint), {
      headers: getHeaders(),
    });
    return response;
  }

  // post method
  async function post(endpoint: string, data: object | FormData) {
    const response = await axios.post(getFullUrl(endpoint), data, {
      headers: getHeaders(),
    });
    return response;
  }

  // put method
  async function put(endpoint: string, data: object | FormData) {
    const response = await axios.put(getFullUrl(endpoint), data, {
      headers: getHeaders(),
    });
    return response;
  }

  // patch method
  async function patch(endpoint: string, data: object | FormData) {
    const response = await axios.patch(getFullUrl(endpoint), data, {
      headers: getHeaders(),
    });
    return response;
  }

  // delete method
  async function del(endpoint: string) {
    const response = await axios.delete(getFullUrl(endpoint), {
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
