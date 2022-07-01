import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

const config = process.env.config as any;

export interface EnhancedAxiosRequestConfig extends AxiosRequestConfig {
  useNonce?: boolean;
}

const http = axios.create({
  baseURL: config.gateApi,
  timeout: 60000,
  withCredentials: true,
});

function nonceInterceptor(config: EnhancedAxiosRequestConfig) {
  if (!config.useNonce) return config;

  const nonce = window.prompt('请输入动态验证码');
  const payloadKey = config.method === 'get' ? 'params' : 'data';
  config[payloadKey] = { ...(config[payloadKey] || {}), nonce };

  return config;
}

function tokenInterceptor(config: EnhancedAxiosRequestConfig) {
  const token = 'Bearer Token';
  config.headers = {
    ...(config.headers ?? {}),
    Authorization: `Bearer ${token}`,
  };

  return config;
}

function responseInterceptor(res: AxiosResponse) {
  return res.data;
}

http.interceptors.request.use(nonceInterceptor);
http.interceptors.request.use(tokenInterceptor);
http.interceptors.response.use(responseInterceptor);

export { http };
