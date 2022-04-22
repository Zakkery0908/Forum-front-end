import axios from 'axios'
import { message } from 'antd'
import storageUtils from "../utils/storageUtils";


axios.defaults.withCredentials = true
//拦截处理器 axios在发送之前 从本地存储中获取token
axios.interceptors.request.use(config => {
    let uToken = storageUtils.getToken();
    console.log(uToken)
    if (uToken) {
        config.headers['Authorization'] = uToken;
    }
    return config;
}, error => {
    console.log('发送失败了')
    Promise.reject(error);
})



//拦截处理器 axios截取response并对数据作出统一处理
axios.interceptors.response.use(res => {
    return res;

}, error => {
    storageUtils.removeToken()
    storageUtils.removeUser()
    window.location.href = "/login"
})



//封装的AJAX登录请求
export default function ajax(url, data = {}, type = 'GET') {

    //Promise 里面是另一个新的promise   promise里面有resolve和reject,通过promise.then来调用这两个函数  
    return new Promise((resolve, reject) => {
        let uToken = storageUtils.getToken();
        let promise
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data
            },
                { headers: { 'Authorization': uToken } })
        } else {
            promise = axios.post(url, data, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('服务器出了问题', 6)
        })
    })


}
