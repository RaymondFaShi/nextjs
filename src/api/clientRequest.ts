// 请求封装

// libaray
import HttpClient from "@/libaray/httpClient";

// request接口
const request = new HttpClient( {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000
} );

// 请求拦截器

// 响应拦截器

export default request;