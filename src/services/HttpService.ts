import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

// const proxyAgent = new HttpsProxyAgent("http://127.0.0.1:10808");

export const axiosWithProxy = axios.create({
  // httpsAgent: proxyAgent,
  // httpAgent: proxyAgent,
  // proxy: false,
});

// axios.defaults.httpsAgent = proxyAgent;
// axios.defaults.httpAgent = proxyAgent;
// axios.defaults.proxy = false;
