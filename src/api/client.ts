// client request

// libaray
import HttpClient from "@/libaray/httpClient";


const service = new HttpClient( {
    baseURL: 'https://api.erpvape.com',
    timeout: 5000,
} );

export default service;