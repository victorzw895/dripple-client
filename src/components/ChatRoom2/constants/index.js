export const API_ROOT = "http://localhost:3000";
export const API_WS_ROOT = "ws://localhost:3000/cable";
// export const API_ROOT = "http://dripples.herokuapp.com/";
// export const API_WS_ROOT = "ws://dripples.herokuapp.com/cable";

export const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Bearer " + localStorage.getItem("jwt")
};
