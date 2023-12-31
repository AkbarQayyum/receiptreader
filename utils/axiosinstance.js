import axios from "axios";
let type = "live";
const BaseUrl =
  type === "android"
    ? "http://10.0.2.2:4433/"
    : type === "live"
    ? "https://tiny-puce-shrimp-cape.cyclic.cloud"
    : "http://localhost:4433/";
const axiosInstance = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${cookies.get("token")}`,
  },
});

// some way of changing it
// export const setToken = (newLocale) => {
//   token = newLocale;
// };

// register a synchronous request interceptor
axiosInstance.interceptors.request.use(
  (config) => ({
    ...config,
    headers: {
      ...config.headers,
      // Authorization: `Bearer ${cookies.get("token")}`,
    },
  }),
  null,
  { synchronous: true }
);

export default axiosInstance;
