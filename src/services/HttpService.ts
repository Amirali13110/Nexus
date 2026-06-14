import axios from "axios";
// let axiosWithProxy;
// if (process.env.NODE_ENV === "development") {
//   const { HttpsProxyAgent } = require("https-proxy-agent");
//   const proxyAgent = new HttpsProxyAgent("http://127.0.0.1:10808");
//   axiosWithProxy = axios.create({});
// } else {
//   axiosWithProxy = axios.create();
// }
// export { axiosWithProxy };

export const axiosWithProxy = axios.create()